'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CustomButton from './CustomButton';

const Header = () => {
  const router = useRouter();
  return (
    <header
      className={
        'text-2xl bg-white shadow-lg fixed top-0 font-semibold max-w-7xl w-full rounded-b-2xl flex justify-between items-center z-[99] text-black px-9 h-20'
      }
    >
      <Link href='/'>
        Quali<span className='text-chinese-blue'>UN</span>{' '}
      </Link>
      <div className='flex gap-11 h-full items-center'>
        <Link href='/faq' className='text-lg'>
          FAQ
        </Link>
        <CustomButton
          type={1}
          textS={2}
          text={'Log In'}
          action={() => {
            router.push(false ? '/' : '/login');
          }}
        ></CustomButton>
      </div>
    </header>
  );
};

export default Header;
