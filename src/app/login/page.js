'use client';

import Image from 'next/image';
import pattern1 from '../../../public/pattern_1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../components/CustomButton';

const page = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center h-fit min-h-screen pt-20'>
      <div className='w-full md:h-full h-fit max-w-7xl p-9 flex md:flex-row flex-col gap-9 md:justify-between'>
        <div className='w-[226px] h-[339px] md:block hidden relative'>
          <Image
            alt='patron1'
            src={pattern1}
            fill
            className='object-contain z-0'
            quality={100}
            sizes='100%'
            priority
          />
        </div>
        <div className='md:w-1/2 w-full items-center flex flex-col h-max'>
          <div className='w-fit'>
            <h1 className='text-2xl font-semibold mt-2 px-2'>Inicio de sesión</h1>
            <div className='w-full h-1 bg-chinese-blue rounded-full'></div>
          </div>
          <div className='flex h-fit w-[90%] max-w-[300px] flex-col mt-2'>
            <label htmlFor='search' className='mt-4 text-lg font-semibold'>
              Usuario:
            </label>
            <div className='flex h-fit items-center mt-1'>
              <input
                id='search'
                type='text'
                placeholder='Ingresa tu usuario...'
                className='pl-4 pr-10 py-2 w-full rounded-lg border-[3px] border-eerie-black/40 text-base focus:border-[3px] focus:border-chinese-blue focus:outline-none'
              />
              <button type='submit' className='-ml-8 text-chinese-blue hover:text-dust-storm'>
                <FontAwesomeIcon icon={faSearch} className=' text-xl' />
              </button>
            </div>
            <span className='text-sm font-bold mt-1'>
              <span className='text-red-700'>Nota:</span> Tu usuario es todo lo que está antes de
              @uninorte.edu.co en tu correo institucional.
            </span>
          </div>
          <div className='flex h-fit w-[90%] max-w-[300px] flex-col'>
            <label htmlFor='search' className='mt-4 text-lg font-semibold'>
              Contraseña:
            </label>
            <div className='flex h-fit items-center mt-1'>
              <input
                id='search'
                type='text'
                placeholder='Ingresa tu contraseña...'
                className='pl-4 pr-10 py-2 w-full rounded-lg border-[3px] border-eerie-black/40 text-base focus:border-[3px] focus:border-chinese-blue focus:outline-none'
              />
              <button type='submit' className='-ml-8 text-chinese-blue hover:text-dust-storm'>
                <FontAwesomeIcon icon={faSearch} className=' text-xl' />
              </button>
            </div>
          </div>
          <CustomButton
            width={'w-full max-w-[200px] min-w-fit mt-8'}
            type={1}
            textS={2}
            text={'Iniciar sesión'}
            action={() => {
              alert('Hola');
            }}
            icon='none'
          ></CustomButton>
        </div>
        <div className='w-[226px] h-[339px] md:block hidden relative'>
          <Image
            alt='patron1'
            src={pattern1}
            fill
            className='object-contain z-0'
            quality={100}
            sizes='100%'
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default page;
