import CustomButton from '@/app/components/CustomButton';
import Stat from '@/app/components/cursosTab/curso/stat';
import Comment from '@/app/components/cursosTab/curso/Comment';
import PocketBase from 'pocketbase';
import { handleReviewData, getAveragesForCourse } from '@/CourseValueHandlers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

// Fetch course data
const getCourse = async (id) => {
  const pb = new PocketBase('https://qualiun.pockethost.io/');

  const courseQuery = await pb.collection('courses').getOne(id, {
    expand: 'reviews(course).answers.question_answered.category, department',
  });

  const attributeQuery = await pb.collection('quality_categories').getFullList({
    filter: 'active=True',
  });

  const reviews = courseQuery.expand['reviews(course)'];
  let data;
  if (reviews) {
    data = handleReviewData(reviews);
  } else {
    data = [];
  }

  // Data has the following structure:
  // [
  //   {
  //     id: <review id>,
  //     comments: <review comment>,
  //     category_values: {
  //       <category name>: <category value>,
  //       ...
  //     }
  //   },
  //   ...
  // ]

  // We need to get each category and find its average across all reviews
  const averages = getAveragesForCourse(data, attributeQuery);

  return {
    course: {
      id: courseQuery.id,
      name: courseQuery.name,
      department: courseQuery.expand.department.name,
      code: courseQuery.course_code + ' ' + courseQuery.course_number,
      values: averages,
    },
    reviews: data,
  };
};

const Curso = async ({ params }) => {
  const { data: session } = getServerSession(authOptions);
  if (!session) {
    // redirect to login
    //redirect('/login');
  }
  const { id } = params;

  const course = await getCourse(id).then((res) => res);
  const courseInfo = course.course;
  const reviews = course.reviews;
  return (
    <div
      key={id}
      className='w-full min-h-fit overflow-hidden font-semibold mt-28 flex flex-col items-center justify-center'
    >
      <div className='w-full h-full max-w-7xl flex med-lg:flex-row flex-col justify-between px-9'>
        <div className='med-lg:w-1/2 w-full med-lg:items-start items-center h-full min-h-fit flex flex-col justify-center'>
          <div className='flex flex-col items-center'>
            <h2 className='text-2xl text-chinese-blue'>{courseInfo.code}</h2>
            <h1 className='text-3xl'>{courseInfo.name}</h1>
          </div>
          <div className='flex flex-col my-8 med-lg:items-start items-center'>
            <h3 className='text-2xl'>Departamento</h3>
            <h2 className='text-3xl med-lg:text-start text-center text-chinese-blue'>
              {courseInfo.department}
            </h2>
          </div>
          <Link
            className='px-4 py-2 rounded-sm bg-chinese-blue text-white mt-4 self-center'
            href={`/evaluacion/${id}/start`}
          >
            Enviar evaluación
          </Link>
          <div className='w-fit'>
            <h1 className='text-2xl font-semibold mt-16 px-2'>Estadísticas</h1>
            <div className='w-full h-1 bg-chinese-blue rounded-full'></div>
          </div>
          <div className='grid med-lg:mb-0 mb-16 sm:grid-cols-2 grid-cols-1 gap-y-6 mt-6 gap-x-6'>
            {Object.entries(courseInfo.values).map(([id, stat]) => (
              <Stat key={id} stat={stat}></Stat>
            ))}
          </div>
        </div>
        <div className='med-lg:w-[45%] sm:w-[80%] mb-16 p-4 flex-col overflow-y-auto gap-2 h-[600px] self-center rounded-lg border-2 border-dashed border-chinese-blue flex items-center'>
          <div className='w-fit p-9'>
            <h1 className='sm:text-2xl text-xl font-semibold px-2'>Comentarios Generales</h1>
            <div className='w-full h-1 bg-chinese-blue rounded-full'></div>
          </div>
          <div className='px-4 gap-2 pb-9 w-full h-full flex flex-col overflow-y-auto'>
            {reviews.filter((review) => review.comment !== '').length > 0 ? (
              reviews.map(
                (review) => review.comment && <Comment key={comment.id} comment={comment}></Comment>
              )
            ) : (
              <div className='w-full h-full flex flex-col items-center justify-center'>
                <h1 className='text-2xl font-semibold'>No hay comentarios</h1>
                <p className='text-center'>Sé el primero en comentar sobre este curso</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curso;
