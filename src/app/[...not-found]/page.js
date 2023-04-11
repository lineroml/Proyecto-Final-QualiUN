'use client';

import CustomButton from '../components/CustomButton';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  return (
    <div className='w-full h-fit flex flex-col items-center'>
      <div className='mt-36 w-full max-w-7xl h-fit flex flex-col items-center font-semibold mb-16'>
        <div className='w-[50%] md:w-[30%] h-fitrelative'>
          <img src='/404/notfound.svg' alt='404svg' />
        </div>
        <span className='text-2xl mt-10 text-chinese-blue'>¿A donde quieres ir? </span>
        Esta página no existe :( <br />
      </div>
      <CustomButton
        text='Regrésame a QualiUN'
        icon='404'
        action={() => router.push('/')}
      ></CustomButton>
      <div className='w-[100px] mt-16 h-fit relative'>
        <img src='/404/heartbroken.svg' alt='404svg' />
      </div>
    </div>
  );
}
