import CustomButton from '@/app/components/CustomButton';
import Stat from '@/app/components/cursosTab/curso/stat';
import Image from 'next/image';
import fs from 'fs';

const cursoStats = [
  {
    id: 1,
    name: 'Pertinencia',
    value: 2,
    desc: 'El curso se ajusta a los objetivos de la carrera',
  },
  {
    id: 2,
    name: 'Calidad Docente',
    value: 3.5,
    desc: 'El profesor es capaz de transmitir los conocimientos de manera clara y precisa',
  },
  {
    id: 3,
    name: 'Infraestructura',
    value: 4.5,
    desc: 'La infraestructura del curso es adecuada para el desarrollo de las actividades',
  },
  {
    id: 4,
    name: 'Recursos',
    value: 1.5,
    desc: 'Los recursos del curso son adecuados para el desarrollo de las actividades',
  },

  {
    id: 5,
    name: 'Acompañamiento',
    value: 5,
    desc: 'El profesor y/o monitor y/o tutor brinda un acompañamiento adecuado a los estudiantes',
  },
  {
    id: 6,
    name: 'Contenido',
    value: 1,
    desc: 'El contenido del curso es adecuado (completo) para el desarrollo de las actividades',
  },
];

const getRandomPfp = () => {
  const files = fs.readdirSync('public/commentIcons');

  const color = {
    1: 'bg-comment-color-1 text-comment-color-1',
    2: 'bg-comment-color-2 text-comment-color-2',
    3: 'bg-comment-color-3 text-comment-color-3',
    4: 'bg-comment-color-4 text-comment-color-4',
    5: 'bg-comment-color-5 text-comment-color-5',
  };

  const random = Math.floor(Math.random() * files.length);

  // choose random number between 1 and 5
  const randomNum = Math.floor(Math.random() * 5) + 1;

  // Create an array of adjectives for me to use
  const adjectives = [
    'awesome',
    'amazing',
    'great',
    'fantastic',
    'incredible',
    'wonderful',
    'marvelous',
    'spectacular',
    'stupendous',
    'excellent',
    'outstanding',
    'terrific',
    'fabulous',
    'magnificent',
    'remarkable',
    'superb',
    'dazzling',
    'brilliant',
    'glorious',
    'splendid',
    'impressive',
    'awe-inspiring',
    'stunning',
    'astonishing',
    'astounding',
  ];

  // Choose a random adjective
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];

  // fetch the filename of the random image
  const filename = files[random];

  // Return the number, adjective, and filename
  return { randomNum, adjective, filename };
};

const color = {
  1: 'bg-comment-col-1 border-comment-col-1',
  2: 'bg-comment-col-2 border-comment-col-2',
  3: 'bg-comment-col-3 border-comment-col-3',
  4: 'bg-comment-col-4 border-comment-col-4',
  5: 'bg-comment-col-5 border-comment-col-5',
};

const Curso = ({ params }) => {
  const { id } = params;

  const { randomNum, adjective, filename } = getRandomPfp();
  console.log(randomNum, adjective, filename);

  return (
    <div
      key={id}
      className='w-full min-h-fit font-semibold h-[calc(100vh-80px)] mt-20 bg-red-200 flex flex-col items-center justify-center'
    >
      <div className='w-full h-fit max-w-7xl bg-blue-200 flex justify-between px-9'>
        <div className='w-1/2 h-full min-h-[calc(100vh-80px)] bg-lime-300 flex flex-col justify-center'>
          <div className='flex flex-col'>
            <h2 className='text-2xl text-chinese-blue'>IST 2356</h2>
            <h1 className='text-3xl'>Ingeniería 404</h1>
          </div>
          <div className='flex flex-col my-8'>
            <h3 className='text-2xl'>Departamento</h3>
            <h2 className='text-3xl text-chinese-blue'>Ingeniería de Sistemas y computación</h2>
          </div>
          <CustomButton type={1} text='Descargar Reporte' icon='Download'></CustomButton>
          <div className='w-fit'>
            <h1 className='text-2xl font-semibold mt-16 px-2'>Estadísticas</h1>
            <div className='w-full h-1 bg-chinese-blue rounded-full'></div>
          </div>
          <div className='grid grid-cols-2 gap-y-6 mt-6'>
            {cursoStats.map((stat) => (
              <Stat stat={stat}></Stat>
            ))}
          </div>
        </div>
        <div className='w-[45%] flex-col p-9 h-[80%] min-h-[500px] self-center rounded-lg bg-yellow-300 border-2 border-dashed border-chinese-blue flex items-center'>
          <div className='w-fit mb-10'>
            <h1 className='text-2xl font-semibold px-2'>Comentarios Generales</h1>
            <div className='w-full h-1 bg-chinese-blue rounded-full'></div>
          </div>
          <div className='h-fit flex bg-lime-100 w-full'>
            <div className={` relative h-11 border-4 ${color[randomNum]} w-11 rounded-full`}>
              <Image
                src={`/commentIcons/${filename}`}
                fill
                className='object-contain z-0'
                quality={100}
                priority
              ></Image>
            </div>
            <div className='font-bold text-base'>
              <span className='capitalize ml-4'>{adjective}</span>
              {` `}
              <span className=''>{filename.substring(0, filename.length - 4)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curso;
