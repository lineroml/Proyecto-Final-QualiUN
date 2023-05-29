'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ColorRing } from 'react-loader-spinner';

const Questions = ({ preguntas = [], courseId = '' }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [questions, setQuestions] = useState(preguntas);

  /** create an answered questions array and each time one is answered, the value in that array's part changes, start fully false */
  const [answeredQuestions, setAnsweredQuestions] = useState(preguntas.map(() => false));

  /** create a selected array and each time one is selected, the value in that array's part changes */
  const [selected, setSelected] = useState([]);
  const [missingQuestions, setMissingQuestions] = useState([]);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

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
  };

  console.log('after selection --- ', 'AQ: ', answeredQuestions, 'selected: ', selected);

  const handleSend = () => {
    setLoading(true);
    let missing = [];
    for (let i = 0; i < answeredQuestions.length; i++) {
      if (answeredQuestions[i] == false) {
        missing.push(i + 1);
      }
    }
    setMissingQuestions(missing);

    if (missing.length !== 0) {
      alert('Faltan preguntas por responder');
      setLoading(false);
      return;
    }

    const answers = selected.map((answer, index) => {
      return {
        pregunta: questions[index].id,
        respuesta: answer,
      };
    });
    fetch('/api/eval/submit', {
      method: 'POST',
      body: JSON.stringify({ answers, courseId, userId, comment }),
      cache: 'no-store',
    }).then(async (res) => {
      if (res.status === 200) {
        alert('Respuestas enviadas');
        const body = await res.json();
        router.push(`/cursos/${courseId}`);
      } else {
        alert('Error al enviar respuestas');
        //router.push(`/cursos/${courseId}`);
      }
    });
  };

  return (
    <>
      {questions.map((pregunta, index) => {
        if (pregunta.tipo === '1-5') {
          return (
            <div
              key={index}
              className={`${
                answeredQuestions[index] == true ? 'bg-lime-100' : 'bg-none'
              } w-full my-2 max-w-5xl p-6 border-2 border-chinese-blue rounded-lg border-dashed`}
            >
              <span className='font-bold'>
                {index + 1} - {pregunta.pregunta}
              </span>
              <div className='w-full flex-wrap flex gap-2 text-sm mt-2'>
                <button
                  className={`${
                    selected[index] == 5 ? 'border-2 border-black' : 'border-none'
                  } px-4 py-2 rounded-sm bg-lime-400`}
                  onClick={() => {
                    handleSelected(index, 5);
                  }}
                >
                  Muy Satisfecho
                </button>
                <button
                  className={`${
                    selected[index] == 4 ? 'border-2 border-black' : 'border-none'
                  } px-4 py-2 rounded-sm bg-lime-200`}
                  onClick={() => {
                    handleSelected(index, 4);
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
                    selected[index] == 2 ? 'border-2 border-black' : 'border-none'
                  } px-4 py-2 rounded-sm bg-orange-400`}
                  onClick={() => {
                    handleSelected(index, 2);
                  }}
                >
                  Insatisfecho
                </button>
                <button
                  className={`${
                    selected[index] == 1 ? 'border-2 border-black' : 'border-none'
                  } px-4 py-2 rounded-sm bg-red-400`}
                  onClick={() => {
                    handleSelected(index, 1);
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
              key={index}
              className={`${answeredQuestions[index] == true ? 'bg-lime-100' : 'bg-none'}
           w-full my-2 max-w-5xl p-2 border-2 border-chinese-blue rounded-lg border-dashed`}
            >
              <span className='font-bold'>
                {index + 1} - {pregunta.pregunta}
              </span>
              <div className='w-full flex-col flex gap-2 text-sm mt-2'>
                {pregunta.opciones.map((opcion, index2) => {
                  return (
                    <div className='flex items-center gap-2' key={index2}>
                      <input
                        type='radio'
                        name={`pregunta${index}`}
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
      <div
        className={
          'bg-none w-full my-2 max-w-5xl p-2 border-2 border-chinese-blue rounded-lg border-dashed'
        }
      >
        <span className='font-bold'>
          ¿Tienes algún comentario adicional que quieras compartir con nosotros?
        </span>
        <div className='w-full flex-wrap flex gap-2 text-sm mt-2'>
          <textarea
            className='w-full h-32 border-2 border-chinese-blue rounded-lg'
            value={comment}
            placeholder='Escribe aquí tu comentario...'
            onChange={(e) => {
              setComment(e.target.value);
            }}
          ></textarea>
        </div>
      </div>
      {answeredQuestions.includes(false) ? (
        <button
          className='px-4 py-2 cursor-not-allowed rounded-sm bg-gray-400 text-white mt-4'
          onClick={() => {
            alert('Tienes preguntas sin responder!');
            setMissingQuestions(
              answeredQuestions.map((answer, index) => {
                if (answer === false) {
                  return index;
                }
              })
            );
          }}
          disabled
        >
          Enviar evaluación
        </button>
      ) : (
        <button
          className='px-4 py-2 rounded-sm bg-chinese-blue text-white mt-4'
          onClick={() => {
            handleSend();
          }}
          disabled={loading}
        >
          {loading ? (
            <ColorRing
              colors={['#315098', '#FBD0E0', '#AFBDB0', '#1E1E1E', '#8CA8BE']}
              height={30}
              width={30}
            />
          ) : (
            'Enviar evaluación'
          )}
        </button>
      )}
    </>
  );
};

export default Questions;
