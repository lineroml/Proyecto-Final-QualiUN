import CustomButton from '@/app/components/CustomButton';
import Stat from '@/app/components/cursosTab/curso/stat';
import Comment from '@/app/components/cursosTab/curso/Comment';

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
    value: 4,
    desc: 'El contenido del curso es adecuado (completo) para el desarrollo de las actividades',
  },
];

const cursoComments = [
  {
    id: 1,
    comment: 'El curso es muy bueno, el profesor es muy bueno y explica muy bien',
  },
  {
    id: 2,
    comment:
      'El profesor podría explicar un poco más, pero en general es muy bueno. En cuanto a la infraestructura, los computadores son muy lentos y no se puede trabajar bien.',
  },
  {
    id: 3,
    comment: 'Se podría mejorar el contenido, hay cosas que a día de hoy ya no se usan',
  },
  {
    id: 4,
    comment:
      'En general el curso es muy bueno pero los proyectos no se pueden hacer en casa porque no hay suficientes recursos',
  },
  {
    id: 5,
    comment:
      'El curso es muy bueno, el profesor es muy bueno y explica muy bien. El contenido es muy bueno, pero los recursos son muy malos',
  },
  {
    id: 6,
    comment:
      'El curso es muy bueno, el profesor es muy bueno y explica muy bien. El contenido es muy bueno, pero los recursos son muy malos',
  },
  {
    id: 7,
    comment:
      'El curso es muy bueno, el profesor es muy bueno y explica muy bien. El contenido es muy bueno, pero los recursos son muy malos',
  },
];

const Curso = ({ params }) => {
  const { id } = params;

  return (
    <div
      key={id}
      className='w-full min-h-fit overflow-hidden font-semibold mt-28 flex flex-col items-center justify-center'
    >
      <div className='w-full h-full max-w-7xl flex justify-between px-9'>
        <div className='w-1/2 h-full min-h-fit flex flex-col justify-center'>
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
              <Stat key={stat.id} stat={stat}></Stat>
            ))}
          </div>
        </div>
        <div className='w-[45%] mb-16 p-4 flex-col overflow-y-auto gap-2 h-[600px] self-center rounded-lg border-2 border-dashed border-chinese-blue flex items-center'>
          <div className='w-fit p-9'>
            <h1 className='text-2xl font-semibold px-2'>Comentarios Generales</h1>
            <div className='w-full h-1 bg-chinese-blue rounded-full'></div>
          </div>
          <div className='px-4 gap-2 pb-9 w-full h-full flex flex-col overflow-y-auto'>
            {cursoComments.map((comment) => (
              <Comment key={comment.id} comment={comment}></Comment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curso;
