'use client';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import CustomButton from './CustomButton';
import {useSession, signIn, signOut} from 'next-auth/react';


const Header = () => {
    const router = useRouter();
    const {data: session} = useSession();
    return (
        <header
            className={
                'text-2xl bg-white shadow-lg fixed top-0 font-semibold max-w-7xl w-full rounded-b-2xl flex justify-between items-center z-[99] text-black px-9 h-20'
            }
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
                    text={session ? 'Log Out' : 'Log In'}
                    action={async () => {
                        if (session) {
                            await signOut();
                            router.push('/');
                        } else {
                            await signIn();
                        }
                    }}
                ></CustomButton>
            </div>
        </header>
    );
};

export default Header;
