'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onClick, value, setValue }) => {
  return (
    <>
      <label htmlFor='search' className='mt-4 med-sm:text-2xl md:text-xl text-lg font-semibold'>
        Te invitamos a buscar una asignatura:
      </label>
      <div className='flex h-fit items-center mt-2'>
        <input
          value={value}
          onChange={setValue}
          id='search'
          type='text'
          placeholder='Ingresa el nombre o el código de la asignatura'
          className='pl-4 pr-10 py-2 w-full rounded-lg border-[3px] border-eerie-black/40 md:text-lg text-base focus:border-[3px] focus:border-chinese-blue focus:outline-none'
        />
        <button
          type='submit'
          onClick={onClick}
          className='-ml-8 text-chinese-blue hover:text-dust-storm'
        >
          <FontAwesomeIcon icon={faSearch} className=' text-xl' />
        </button>
      </div>
    </>
  );
};

export default SearchBar;
