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
    nombre: 'Ingeniería 204',
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
    <div className='w-full flex flex-col items-center h-[calc(100vh-80px)] min-h-fit bg-red-200 mt-20'>
      <div className='w-full h-full max-w-7xl p-9 bg-blue-300'>
        <div className='w-3/5 h-full flex-col'>
          <SearchBar onClick={() => router.push('/courses')}></SearchBar>
          <div className='w-fit'>
            <h1 className='text-xl font-semibold mt-16 px-2'>Resultados de búsqueda</h1>
            <div className='w-full h-1 bg-chinese-blue rounded-full'></div>
            <span className='font-semibold'>4 resultados</span>
          </div>
          <div className='flex flex-col mt-10 gap-2 w-full h-fit bg-yellow-200'>
            {asignaturas.slice(inicio, inicio + salto).map((asignatura) => (
              <AsignaturaTab
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
      </div>
    </div>
  );
};

export default index;
