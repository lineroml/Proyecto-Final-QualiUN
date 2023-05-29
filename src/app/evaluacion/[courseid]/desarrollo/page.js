import Questions from './questions';
import PocketBase from 'pocketbase';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const pb = new PocketBase('https://qualiun.pockethost.io/');

const processType = (type) => {
  switch (type) {
    case 'NRQuestion':
      return '1-5';
    case 'MCQuestion':
      return 'multiple';
    case 'ABQuestion':
      return 'vf';
    default:
      return '1-5';
  }
};

const page = async ({ params }) => {
  const id = params.courseid;
  const course = await pb.collection('courses').getOne(id);
  if (course.code === 404) {
    return redirect(404);
  }

  const session = await getServerSession();
  if (!session) {
    return redirect('/login');
  }
  const questions = await pb.collection('quality_questions').getFullList({
    filter: 'active = true',
  });

  const questionList = questions.map((question) => {
    return {
      id: question.id,
      tipo: processType(question.field),
      pregunta: question.question_text,
      opciones: question.options,
    };
  });

  return (
    <div className='w-full flex flex-col items-center h-fit min-h-screen pt-20'>
      <div className='w-full md:h-full h-fit max-w-7xl p-9 flex md:flex-row flex-col gap-9 justify-center'>
        <div className=' w-full items-center flex flex-col h-max'>
          <div className='w-fit mb-6'>
            <h1 className='text-2xl font-semibold mt-2 px-2'>Preguntas</h1>
            <div className='w-full h-1 bg-chinese-blue rounded-full'></div>
          </div>
          <div className='w-full items-center max-w-[500px] flex flex-col text-center'>
            <span className='font-semibold'>Instrucciones: </span>
            <span className='mb-6'>
              Al estar iluminadas de color <span className='px-2 py-1 bg-lime-100'>verde</span> las
              preguntas, esto significa que ya han sido respondidas,{' '}
              <span className='font-semibold'>
                en caso de haber alguna sin responder, NO se podrá enviar la evaluación.
              </span>
            </span>
          </div>
          <Questions preguntas={questionList} courseId={id} />
        </div>
      </div>
    </div>
  );
};

export default page;
