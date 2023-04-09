'use client';

import SearchBar from '../components/SearchBar';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faSquareCaretLeft, faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import AsignaturaTab from '../components/cursosTab/asignaturaTab';
import Paginacion from '../components/cursosTab/paginacion';

const asignaturas = [
  {
    id: 1,
    nombre: 'Ingeniería 104',
    codigo: 'IST 2356',
    reviews: 50,
  },
  {
    id: 2,
    nombre: 'Ingeniería Astroaerospacial 204',
    codigo: 'IST 2456',
    reviews: 20,
  },
  {
    id: 3,
    nombre: 'Ingeniería 304',
    codigo: 'IST 1156',
    reviews: 102422,
  },
  {
    id: 4,
    nombre: 'Ingeniería 404',
    codigo: 'IST 7756',
    reviews: 50,
  },
];

const index = () => {
  const router = useRouter();
  const [inicio, setInicio] = useState(0);
  const [salto, setSalto] = useState(3);

  const cambioSalto = (nuevoSalto) => {
    setSalto(nuevoSalto);
    setInicio(0);
  };

  const sgtePagina = () => {
    if (inicio + salto < asignaturas.length) {
      setInicio(inicio + salto);
    }
  };

  const antPagina = () => {
    if (inicio - salto >= 0) {
      setInicio(inicio - salto);
    }
  };
  return (
    <div className='w-full flex flex-col items-center h-fit min-h-fit mt-20'>
      <div className='w-full md:h-full h-fit max-w-7xl p-9 flex md:flex-row flex-col-reverse'>
        <div className='md:w-3/5 w-full flex justify-center h-full flex-col'>
          <SearchBar onClick={() => router.push('/cursos')}></SearchBar>
          <div className='w-fit'>
            <h1 className='text-xl font-semibold mt-16 px-2'>Resultados de búsqueda</h1>
            <div className='w-full h-1 bg-chinese-blue rounded-full'></div>
            <span className='font-semibold'>4 resultados</span>
          </div>
          <div className='flex flex-col mt-10 gap-2 w-full h-fit'>
            {asignaturas.slice(inicio, inicio + salto).map((asignatura) => (
              <AsignaturaTab
                key={asignatura.id}
                idAsig={asignatura.id}
                codigo={asignatura.codigo}
                nombre={asignatura.nombre}
                reviews={asignatura.reviews}
              />
            ))}
          </div>
          <Paginacion
            inicio={inicio}
            salto={salto}
            total={asignaturas.length}
            cambioSalto={cambioSalto}
            sgtePagina={sgtePagina}
            antPagina={antPagina}
          ></Paginacion>
        </div>
        <div className='md:w-2/5 md:mb-0 mb-10 w-full px-9 flex justify-center items-center'>
          <img
            src='/ilustracion_cursos.svg'
            alt='ilustracion busqueda'
            className='w-full max-w-[300px]'
          />
        </div>
      </div>
    </div>
  );
};

export default index;
