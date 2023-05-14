'use client';
import {useAuth} from '@/hooks/auth';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import CustomButton from './CustomButton';

const Header = () => {
<<<<<<< HEAD
  return (
    <header
      className={`text-2xl bg-white shadow-lg fixed top-0 font-semibold max-w-7xl w-full rounded-b-2xl flex justify-between items-center z-[99] text-black px-9 h-20`}
    >
      <Link href='/'>
        Quali<span className='text-chinese-blue'>UN</span>{' '}
      </Link>
      <div className='flex gap-11 h-full items-center'>
        <Link href='/faq' className='text-lg'>
          FAQ
        </Link>
        <CustomButton type={1} textS={2}></CustomButton>
      </div>
    </header>
  );
=======
    const {user} = useAuth();
    const router = useRouter();
    return (
        <header
            className={'text-2xl bg-white shadow-lg fixed top-0 font-semibold max-w-7xl w-full rounded-b-2xl flex justify-between items-center z-[99] text-black px-9 h-20'}
        >
            <Link href="/">
                Quali<span className="text-chinese-blue">UN</span>{' '}
            </Link>
            <div className="flex gap-11 h-full items-center">
                <Link href="/" className="text-lg">
                    FAQ
                </Link>
                <CustomButton
                    type={1}
                    textS={2}
                    text={user ? 'Log Out' : 'Log In'}
                    action={() => {
                        router.push(user ? '/' : '/login');
                    }}
                ></CustomButton>
            </div>
        </header>
    );
>>>>>>> 082f58a1010c721794073195b951967671660420
};

export default Header;
