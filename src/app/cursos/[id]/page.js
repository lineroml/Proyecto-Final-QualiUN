const Curso = ({ params }) => {
  const { id } = params;
  return (
    <div className='w-full font-semibold h-full mt-20 bg-red-200 flex flex-col items-center justify-center'>
      <div className='w-full h-fit max-w-7xl bg-blue-200 flex'>
        <div className='w-1/2 p-9 h-full min-h-[calc(100vh-80px)] bg-lime-300 flex flex-col'>
          <div className='flex flex-col'>
            <h2 className='text-2xl text-chinese-blue'>IST 2356</h2>
            <h1 className='text-3xl'>Ingeniería 404</h1>
          </div>
          <div className='flex flex-col mt-8'>
            <h3 className='text-2xl'>Departamento</h3>
            <h2 className='text-3xl text-chinese-blue'>Ingeniería de Sistemas y computación</h2>
          </div>
        </div>
        <div className='w-1/2 p-9 h-full min-h-[calc(100vh-80px)] bg-yellow-300'></div>
      </div>
    </div>
  );
};

export default Curso;
