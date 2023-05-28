'use client';

import CustomButton from '../../components/CustomButton';
import { use, useState, useEffect } from 'react';

const preguntas = [
  {
    tipo: '1-5',
    pregunta: '¿Qué tan satisfecho estás con la clase en general?',
  },
  {
    tipo: '1-5',
    pregunta:
      '¿Consideras útil hoy en día las temáticas dadas en la asignatura?, es decir, ¿crees que te servirán en un futuro?',
  },
  {
    tipo: 'multiple',
    pregunta: '¿Qué tan satisfecho estás con la clase en general?',
    opciones: [
      'Muy satisfecho',
      'Satisfecho',
      'Ni satisfecho ni insatisfecho',
      'Insatisfecho',
      'Muy insatisfecho',
    ],
  },
  {
    tipo: 'multiple',
    pregunta:
      '¿Qué tan satisfecho estás con la infraestructura del salón en el que se impartió la clase?',
    opciones: [
      'Muy satisfecho',
      'Satisfecho',
      'Ni satisfecho ni insatisfecho',
      'Insatisfecho',
      'Muy insatisfecho',
      'Test 1',
    ],
  },
];

const page = () => {
  /** create an answered questions array and each time one is answered, the value in that array's part changes, start fully false */
  const [answeredQuestions, setAnsweredQuestions] = useState(preguntas.map(() => false));

  /** create a selected array and each time one is selected, the value in that array's part changes */
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    console.log('starter arrays --- ', 'AQ: ', answeredQuestions, 'selected: ', selected);
  }, []);

  /** function to handle selected questions and answered questions */
  const handleSelected = (index, value) => {
    setSelected((prev) => {
      let newArr = [...prev];
      newArr[index] = value;
      return newArr;
    });
    setAnsweredQuestions((prev) => {
      let newArr = [...prev];
      newArr[index] = true;
      return newArr;
    });

    console.log('after selection --- ', 'AQ: ', answeredQuestions, 'selected: ', selected);
  };

  return (
    <div className='w-full flex flex-col items-center h-fit min-h-screen pt-20'>
      <div className='w-full md:h-full h-fit max-w-7xl p-9 flex md:flex-row flex-col gap-9 justify-center'>
        <div className=' w-full items-center flex flex-col h-max'>
          <div className='w-fit mb-6'>
            <h1 className='text-2xl font-semibold mt-2 px-2'>Preguntas</h1>
            <div className='w-full h-1 bg-chinese-blue rounded-full'></div>
          </div>
          <div className='w-full items-center max-w-[500px] flex flex-col text-center'>
            <span className='font-semibold'>Instrucciones: </span>
            <span className='mb-6'>
              Al estar iluminadas de color <span className='px-2 py-1 bg-lime-100'>verde</span> las
              preguntas, esto significa que ya han sido respondidas,{' '}
              <span className='font-semibold'>
                en caaso de haber alguna sin responder, NO se podrá enviar la evaluación.
              </span>
            </span>
          </div>
          {preguntas.map((pregunta, index) => {
            if (pregunta.tipo === '1-5') {
              return (
                <div
                  className={`${
                    answeredQuestions[index] == true ? 'bg-lime-100' : 'bg-none'
                  } w-full my-2 max-w-5xl p-2 border-2 border-chinese-blue rounded-lg border-dashed`}
                >
                  <span className='font-bold'>
                    {index + 1} - {pregunta.pregunta}
                  </span>
                  <div className='w-full flex-wrap flex gap-2 text-sm mt-2'>
                    <button
                      className={`${
                        selected[index] == 1 ? 'border-2 border-black' : 'border-none'
                      } px-4 py-2 rounded-sm bg-lime-400`}
                      onClick={() => {
                        handleSelected(index, 1);
                      }}
                    >
                      Muy Satisfecho
                    </button>
                    <button
                      className={`${
                        selected[index] == 2 ? 'border-2 border-black' : 'border-none'
                      } px-4 py-2 rounded-sm bg-lime-200`}
                      onClick={() => {
                        handleSelected(index, 2);
                      }}
                    >
                      Satisfecho
                    </button>
                    <button
                      className={`${
                        selected[index] == 3 ? 'border-2 border-black' : 'border-none'
                      } px-4 py-2 rounded-sm bg-yellow-200`}
                      onClick={() => {
                        handleSelected(index, 3);
                      }}
                    >
                      Ni satisfecho ni insatisfecho
                    </button>
                    <button
                      className={`${
                        selected[index] == 4 ? 'border-2 border-black' : 'border-none'
                      } px-4 py-2 rounded-sm bg-orange-400`}
                      onClick={() => {
                        handleSelected(index, 4);
                      }}
                    >
                      Insatisfecho
                    </button>
                    <button
                      className={`${
                        selected[index] == 5 ? 'border-2 border-black' : 'border-none'
                      } px-4 py-2 rounded-sm bg-red-400`}
                      onClick={() => {
                        handleSelected(index, 5);
                      }}
                    >
                      Muy Insatisfecho
                    </button>
                  </div>
                </div>
              );
            } else if (pregunta.tipo === 'multiple') {
              return (
                <div
                  className={`${answeredQuestions[index] == true ? 'bg-lime-100' : 'bg-none'}
                 w-full my-2 max-w-5xl p-2 border-2 border-chinese-blue rounded-lg border-dashed`}
                >
                  <span className='font-bold'>
                    {index + 1} - {pregunta.pregunta}
                  </span>
                  <div className='w-full flex-col flex gap-2 text-sm mt-2'>
                    {pregunta.opciones.map((opcion, index2) => {
                      return (
                        <div className='flex items-center gap-2'>
                          <input
                            type='radio'
                            name='option'
                            onClick={() => handleSelected(index, index2)}
                          />
                          <label>{opcion}</label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }
          })}
          {
            /** Now, a button to send answers but It won't let you send unless all of the answers have been answered */
            answeredQuestions.includes(false) ? (
              <button
                className='px-4 py-2 cursor-not-allowed rounded-sm bg-gray-400 text-white mt-4'
                onClick={() => alert('cannot send!!!')}
                disabled
              >
                Enviar evaluación
              </button>
            ) : (
              <button
                className='px-4 py-2 rounded-sm bg-chinese-blue text-white mt-4'
                onClick={() => alert('can send')}
              >
                Enviar evaluación
              </button>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default page;
