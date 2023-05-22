'use client';

import Image from 'next/image';
import pattern1 from '../../../public/pattern_1.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../components/CustomButton';
import {useState} from 'react';
import {useRouter} from 'next/navigation';

const Page = () => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignup = async () => {
        setLoading(true);
        fetch(
            '/api/auth/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
                cache: 'no-cache',
            }
        ).then(
            async (res) => {
                const val = await res.json();
                console.log(val);
                if (val && !val.error) {
                    setError('');
                    setLoading(false);
                    router.push('/account-activation');
                } else {
                    setError(val.message);
                    setLoading(false);
                }
            }
        ).catch(
            (err) => {
                console.log('Ups');
                setError('Algo ocurrió creando tu cuenta, por favor intenta mas tarde');
                setLoading(false);
            }
        );
    };

    return (
        <div className="w-full flex flex-col items-center justify-center h-fit min-h-screen pt-20">
            <div
                className="w-full md:h-full h-fit max-w-7xl p-9 flex md:flex-row flex-col gap-9 md:justify-between items-center">
                <div className="w-[226px] h-[339px] md:block hidden relative">
                    <Image
                        alt="patron1"
                        src={pattern1}
                        fill
                        className="object-contain z-0"
                        quality={100}
                        sizes="100%"
                        priority
                    />
                </div>
                <div className="md:w-1/2 w-full items-center flex flex-col h-max">
                    <div className="w-fit">
                        <h1 className="text-2xl font-semibold mt-2 px-2">Crea tu cuenta</h1>
                        <div className="w-full h-1 bg-chinese-blue rounded-full"></div>
                    </div>
                    <div className="flex h-fit w-[90%] max-w-[300px] flex-col mt-2">
                        <label htmlFor="search" className="mt-4 text-lg font-semibold">
                            Correo:
                        </label>
                        <div className="flex h-fit items-center mt-1">
                            <input
                                type="text"
                                placeholder="Ingresa tu correo UN"
                                className="pl-4 pr-10 py-2 w-full rounded-lg border-[3px] border-eerie-black/40 text-base focus:border-[3px] focus:border-chinese-blue focus:outline-none"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        <ul className="text-sm font-semibold list-disc px-6 mt-2">
                            <li>Debe ser @uninorte.edu.co</li>
                            <li>Tu usuario será todo lo que esté antes de @uninorte.edu.co</li>
                            <li>
                                Asegúrate de tener acceso al correo para activar tu cuenta{' '}
                                <span className="text-chinese-blue">QualiUN</span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex h-fit w-[90%] max-w-[300px] flex-col">
                        <label htmlFor="search" className="mt-4 text-lg font-semibold">
                            Contraseña:
                        </label>
                        <div className="flex h-fit items-center mt-1">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Ingresa tu contraseña"
                                className="pl-4 pr-10 py-2 w-full rounded-lg border-[3px] border-eerie-black/40 text-base focus:border-[3px] focus:border-chinese-blue focus:outline-none"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <button
                                type="submit"
                                className="-ml-[36px] text-chinese-blue hover:text-dust-storm"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <FontAwesomeIcon icon={faEyeSlash} className=" text-base"/>
                                ) : (
                                    <FontAwesomeIcon icon={faEye} className=" text-base"/>
                                )}
                            </button>
                        </div>
                        <ul className="text-sm font-semibold list-disc px-6 mt-2">
                            <li>NO tiene que ser la misma contraseña que la de los servicios UN</li>
                            <li>Mínimo 8 caracteres</li>
                            <li>Mínimo 1 número y 1 letra</li>
                        </ul>
                    </div>
                    <CustomButton
                        width={'w-full max-w-[200px] min-w-fit mt-8'}
                        type={1}
                        textS={2}
                        text={loading ? 'Cargando...' : 'Crear cuenta'}
                        action={async () => {
                            await handleSignup();
                        }}
                        icon="none"
                        disabled={loading}
                    ></CustomButton>
                    {false && (
                        <span
                            id="error-msg"
                            className="text-sm text-red-500 mt-2 font-bold w-full max-w-[300px] text-center"
                        >
              {/** Insertar mensajes de error */}
                            {
                                'Asegúrate de que tu correo sea @uninorte.edu.co y que tu contraseña cumpla con los requisitos'
                            }
            </span>
                    )}
                </div>
                <div className="w-[226px] h-[339px] md:block hidden relative">
                    <Image
                        alt="patron1"
                        src={pattern1}
                        fill
                        className="object-contain z-0"
                        quality={100}
                        sizes="100%"
                        priority
                    />
                </div>
            </div>
        </div>
    );
};

export default Page;
