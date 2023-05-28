'use client';

import { useRouter } from 'next/navigation';
import CustomButton from '../../../components/CustomButton';
import { useState } from 'react';

const Page = ({ params }) => {
  const id = params.courseid;
  const router = useRouter();
  return (
    <div className='w-full flex flex-col items-center justify-center h-fit min-h-screen pt-20'>
      <div className='w-full md:h-full h-fit max-w-7xl p-9 flex md:flex-row flex-col gap-9 justify-center'>
        <div className='md:w-1/2 w-full items-center flex flex-col h-max'>
          <div className='w-fit'>
            <h1 className='text-2xl font-semibold mt-2 px-2'>Evaluación de Calidad Integral</h1>
            <div className='w-full h-1 bg-chinese-blue rounded-full'></div>
          </div>
          <div className='h-fit w-[90%] max-w-[500px] mt-2 text-center'>
            <span className='font-semibold text-lg'>
              ¡Bienvenido a la evaluación de calidad integral!
            </span>{' '}
            <br />
            Aunque el nombre suene tedioso y largo lo único que necesitamos aquí es tu{' '}
            <span className='text-chinese-blue font-bold w-fit'>experiencia</span> y
            <span className='text-chinese-blue font-bold w-fit'> opinión</span> sobre el curso que
            acabas de terminar o ya habías terminado antes.
          </div>

          <div className='w-full bg- max-w-[400px] my-10 flex flex-col items-center p-6 border-2 border-dashed border-chinese-blue rounded-md'>
            <div className='w-fit h-fit mb-2 relative'>
              <img src='/heartfun.svg' alt='fnsvg' />
            </div>
            <div className='h-fit w-[90%] mt-2 text-center text-sm font-semibold'>
              Nosotros y tus compañeros apreciariamos muchisimo si esta evaluación o mini encuesta
              la haces con dedicación y honestidad.
            </div>
          </div>
          <CustomButton
            icon='play'
            text='Empezar Encuesta'
            action={() => router.push(`/evaluacion/${id}/desarrollo`)}
          ></CustomButton>
        </div>
      </div>
    </div>
  );
};

export default Page;
