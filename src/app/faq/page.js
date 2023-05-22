'use client';

import {useState} from 'react';

const Page = () => {
    const [shown, setShown] = useState(0);

    const handleShown = (id) => {
        if (shown !== id) {
            setShown(id);
        } else {
            setShown(0);
        }
    };

    return (
        <div className="w-full select-none flex justify-center min-h-screen h-fit pt-28">
            <div className=" px-12 w-full h-fit max-w-7xl flex flex-col items-center">
                <div className="w-[336px] h-[216px] relative">
                    <img src="/faq/faq_illustration.svg" alt="faqsvg"/>
                </div>
                <div className="w-fit mb-16 text-center">
                    <h1 className="text-2xl font-semibold mt-2 px-2">
                        <span className="text-chinese-blue">FAQ</span> - Preguntas frecuentes
                    </h1>
                    <div className="w-full h-1 bg-chinese-blue rounded-full"></div>
                </div>
                <div
                    className="sm:w-[80%] mb-20 w-full p-8 mx-10 border-2 border-chinese-blue rounded-md border-dashed">
                    <div className="w-full">
                        <h3 onClick={() => handleShown(1)} className="w-full text-xl font-bold cursor-pointer">
                            ¿Qué es <span className="text-chinese-blue">QualiUN</span>? ¿Cuál es su objetivo?
                        </h3>
                        <h4
                            className={`${
                                shown === 1 ? 'block' : 'hidden'
                            } mt-2 text-base font-medium text-justify`}
                        >
                            QualiUN es una plataforma prototipo y piloto. Esta permite llevar a cabo un proceso de
                            evaluación integral de la calidad del departamento de Ingeniería de sistemas de la
                            Universidad del Norte (Docentes, Procesos académicos, Currículo, Investigación,
                            Infraestructura, Bienestar Universitario, procesos académicos) (Al ser un prototipo,
                            de momento se encuentra arraigado solamente a este departamento), desde las
                            perspectivas de los estudiantes del programa y generar los reportes estandarizados.
                        </h4>
                    </div>
                    <div className="h-0 border border-dashed border-chinese-blue my-6"></div>
                    <div className="w-full">
                        <h3 onClick={() => handleShown(2)} className="w-full text-xl font-bold cursor-pointer">
                            ¿Mi cuenta de <span className="text-chinese-blue">QualiUN</span> es la misma de los
                            servicios UN?
                        </h3>
                        <h4
                            className={`${
                                shown === 2 ? 'block' : 'hidden'
                            } mt-2 text-base font-medium text-justify`}
                        >
                            No, las cuentas QualiUN son independientes de los servicios oficiales de la
                            Universidad debido a que QualiUN surgió como un proyecto de grado y aún no se
                            encuentra vinculado a la Universidad del Norte.
                        </h4>
                    </div>
                    <div className="h-0 border border-dashed border-chinese-blue my-6"></div>
                    <div className="w-full">
                        <h3 onClick={() => handleShown(3)} className="w-full text-xl font-bold cursor-pointer">
                            ¿Es <span className="text-chinese-blue">QualiUN</span> de la Universidad del Norte?
                        </h3>
                        <h4
                            className={`${
                                shown === 3 ? 'block' : 'hidden'
                            } mt-2 text-base font-medium text-justify`}
                        >
                            No, QualiUN actualmente no se encuentra vinculado a la Universidad del Norte. QualiUN
                            es un proyecto de grado y aunque su objetivo implique una conexión con la universidad,
                            esta no es oficial por lo que QualiUN se encuentra lo más independiente posible de la
                            misma.
                        </h4>
                    </div>
                    <div className="h-0 border border-dashed border-chinese-blue my-6"></div>
                    <div className="w-full">
                        <h3 onClick={() => handleShown(4)} className="w-full text-xl font-bold cursor-pointer">
                            ¿Cuál es el futuro de <span className="text-chinese-blue">QualiUN</span>?
                        </h3>
                        <h4
                            className={`${
                                shown === 4 ? 'block' : 'hidden'
                            } mt-2 text-base font-medium text-justify`}
                        >
                            De momento no se sabe. JIJIJAJA.
                        </h4>
                    </div>
                    <div className="h-0 border border-dashed border-chinese-blue my-6"></div>
                    <div className="w-full">
                        <h3 onClick={() => handleShown(5)} className="w-full text-xl font-bold cursor-pointer">
                            ¿Cómo funciona el sistema de cuentas de{' '}
                            <span className="text-chinese-blue">QualiUN</span>?
                        </h3>
                        <h4
                            className={`${
                                shown === 5 ? 'block' : 'hidden'
                            } mt-2 text-base font-medium text-justify`}
                        >
                            Al ser independientes de la universidad, no utilizamos su sistema propio de cuentas
                            por lo que para acceder a QualiUN de forma activa debes crear una cuenta. Para crear
                            una cuenta QualiUN necesitas un correo UniNorte, esto para garantizar tu pertenencia a
                            la universad. Luego de crear la cuenta esta se creará desactivada en caso tal de
                            utilizar correos inexistentes. Para activar la cuenta debes acceder a tu correo y
                            seguir los pasos dados en el correo que recibas de QualiUN, si no ves el correo de
                            QualiUN este probablemente se encuentre en la carpeta de SPAM. Dado el caso de que no
                            se encuentre en SPAM, puedes comunicarte al correo “lineroml@uninorte.edu.co” (dueña
                            del proyecto de grado 👑). Luego de que tu cuenta haya sido activada ya tendrás acceso
                            total a QualiUN.
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
