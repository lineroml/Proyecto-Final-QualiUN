'use client';

import Image from 'next/image';
import createdacc from '../../../public/createdacc.png';
import CustomButton from '../components/CustomButton';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();

  return (
    <div className='w-full flex flex-col items-center justify-center h-fit min-h-screen pt-20 '>
      <div className='w-full md:h-full h-fit max-w-7xl p-9 flex md:flex-row flex-col gap-9 justify-center items-center'>
        <div className='w-[149px] h-[258px] relative'>
          <Image
            alt='heartgirl'
            src={createdacc}
            fill
            className='object-contain z-0'
            quality={100}
            sizes='100%'
            priority
          />
        </div>
        <div className=' font-semibold w-full items-center flex flex-col gap-6 h-max max-w-[400px]'>
          <span className='text-3xl'>
            ¡Ya casi haces parte de <span className='text-chinese-blue'>QualiUN</span>!
          </span>
          <span className='text-2xl font-medium'>
            Te hemos enviado un correo para que actives tu cuenta.
          </span>
          <span className='text-2xl'>
            Apenas <span className='text-chinese-blue'>actives</span> tu cuenta podrás hacer parte
            activa de <span className='text-chinese-blue'>QualiUN</span>
          </span>
          <CustomButton
            icon='arrow-left'
            width={'w-[90%] self-start'}
            text='Regresar a QualiUN'
            action={() => router.push('/')}
          ></CustomButton>
        </div>
      </div>
    </div>
  );
};

export default page;
