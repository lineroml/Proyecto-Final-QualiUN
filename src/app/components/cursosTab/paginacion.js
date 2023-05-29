import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretLeft, faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';

export const dynamic = 'force-dynamic';

const Paginacion = ({ inicio, salto, sgtePagina, antPagina, total, cambioSalto }) => {
  return (
    <div className='w-full h-10 mt-6 flex justify-between'>
      <div className='w-fit h-full'>
        <label htmlFor='select' className='font-semibold text-sm mr-2'>
          Resultados por página:
        </label>
        <select
          name='select'
          id='select'
          className='w-10 h-full bg-white border-black/30 focus:outline-none rounded-md font-bold'
          onChange={(e) => cambioSalto(e.target.value)}
        >
          <option value={3}>3</option>
          <option value={6}>6</option>
          <option value={9}>9</option>
        </select>
      </div>
      <div className='w-fit flex gap-4 mr-6'>
        <button
          disabled={inicio == 0}
          className={`${
            inicio == 0 ? 'text-pewter-blue/75 cursor-not-allowed' : 'text-chinese-blue'
          } text-4xl`}
          onClick={antPagina}
        >
          <FontAwesomeIcon icon={faSquareCaretLeft}></FontAwesomeIcon>
        </button>
        <button
          disabled={inicio + salto >= total}
          className={`${
            inicio + salto >= total ? 'text-pewter-blue/75 cursor-not-allowed' : 'text-chinese-blue'
          }  text-4xl`}
          onClick={sgtePagina}
        >
          <FontAwesomeIcon icon={faSquareCaretRight}></FontAwesomeIcon>
        </button>
      </div>
    </div>
  );
};

export default Paginacion;
