import Stat from '@/app/components/cursosTab/curso/stat';
import Comment from '@/app/components/cursosTab/curso/Comment';
import PocketBase from 'pocketbase';
import { handleReviewData, getAveragesForCourse } from '@/CourseValueHandlers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const pb = new PocketBase('https://qualiun.pockethost.io/');

// Fetch course data
const getCourse = async (id) => {
  const courseQuery = await pb.collection('courses').getOne(id, {
    expand: 'reviews(course).answers.question_answered.category, department',
  });

  const attributeQuery = await pb.collection('quality_categories').getFullList({
    filter: 'active=True',
  });

  const weights = attributeQuery.map((attribute) => attribute.weight);
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  attributeQuery.forEach((attribute) => {
    attribute.weight = attribute.weight / totalWeight;
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

  // using the averages and weights, we can calculate the overall average
  let overallAverage = attributeQuery.reduce((acc, attribute) => {
    return acc + attribute.weight * averages[attribute.id].value;
  }, 0);

  return {
    course: {
      id: courseQuery.id,
      name: courseQuery.name,
      department: courseQuery.expand.department.name,
      code: courseQuery.course_code + ' ' + courseQuery.course_number,
      values: averages,
      overallAverage: overallAverage,
    },
    reviews: data,
  };
};

const studentHasReviewed = async (session, courseId) => {
  let hasReviewed = false;
  const reviewsByUserOnCourse = await pb.collection('reviews').getFullList({
    filter: `course = "${courseId}" && author = "${session.user.id}"`,
  });

  return reviewsByUserOnCourse.length > 0;
};

const Curso = async ({ params }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    // redirect to login
    console.log('no session');
    redirect('/login');
  }
  const { id } = params;

  const hasReviewed = await studentHasReviewed(session, id);

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
          <div className='text-center self-center'>
            <Stat
              stat={{
                name: 'Puntaje General',
                value: courseInfo.overallAverage,
                count: courseInfo.overallAverage === 0 ? 0 : 1,
                desc: 'Puntaje general de la materia. Calculado con base en las evaluaciones del curso usando pesos ponderados.',
              }}
              center={true}
              size={'3xl'}
              showCount={false}
            ></Stat>
          </div>
          <Link
            className={
              hasReviewed
                ? 'hidden'
                : 'px-4 py-2 rounded-sm bg-chinese-blue text-white mt-6 self-center'
            }
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
            <h1 className='sm:text-2xl text-xl font-semibold px-2'>
              Comentarios Generales
            </h1>
            <div className='w-full h-1 bg-chinese-blue rounded-full'></div>
          </div>
          <div className='px-4 gap-2 pb-9 w-full h-full flex flex-col overflow-y-auto'>
            {reviews.filter((review) => review.comment !== '').length > 0 ? (
              reviews.map(
                (review) =>
                  review.comment && (
                    <Comment key={review.id} comment={review}></Comment>
                  )
              )
            ) : (
              <div className='w-full h-full flex flex-col items-center justify-center'>
                <h1 className='text-2xl font-semibold'>No hay comentarios</h1>
                <p className='text-center'>
                  Sé el primero en comentar sobre este curso
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curso;
