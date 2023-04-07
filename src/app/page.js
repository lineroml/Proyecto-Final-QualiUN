'use client';

import Image from 'next/image';
import { Inter } from 'next/font/google';
import { config } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import pattern1 from '../../public/pattern_1.png';
import { useRouter } from 'next/navigation';
import SearchBar from './components/SearchBar';

config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const router = useRouter();
  return (
    <main className='w-full h-full flex flex-col items-center'>
      <div className='w-full mt-20 min-h-[500px] h-[calc(100vh-80px)] flex justify-center'>
        <div className='w-full h-full max-w-7xl p-9 flex md:flex-row flex-col-reverse'>
          {/** Izquierda */}
          <div className='w-full h-full flex flex-col justify-center md:text-left text-center'>
            <span className='md:text-4xl text-3xl md:mt-0 mt-10 font-medium w-full'>
              ¡Bienvenido a <span className='font-bold text-chinese-blue'>QualiUN</span>!
            </span>
            <span className='md:text-2xl text-lg w-full mt-[17px]'>
              Un portal para hacerle check a la
              <span className='text-chinese-blue'>calidad académica</span> percibida por los mismos{' '}
              <span className='text-chinese-blue'>estudiantes</span> de la{' '}
              <span className='text-chinese-blue'>Universidad del Norte</span>.
            </span>

            <SearchBar onClick={() => router.push('/cursos')}></SearchBar>
          </div>

          {/** Derecha */}
          <div className='w-full h-full  flex items-center justify-center'>
            <div className='w-1/2 h-full relative'>
              <Image
                alt='blob'
                src={pattern1}
                fill
                className='object-contain z-0'
                quality={100}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
