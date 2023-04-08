import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const AsignaturaTab = ({ codigo, nombre, reviews }) => {
  return (
    <div className='bg-white cursor-pointer rounded-xl border-dashed border-2 hover:border-solid hover:border-4 border-chinese-blue w-full min-h-[94px] h-fit flex p-4'>
      <div className='w-[80%] h-full'>
        <span className='font-semibold text-chinese-blue w-full h-fit'>{codigo}</span>
        <h2 className='font-semibold text-xl w-full h-fit'>{nombre}</h2>
      </div>
      <div className='w-[20%] h-full flex items-center justify-end gap-2'>
        <FontAwesomeIcon icon={faStar} className='text-xl text-chinese-blue'></FontAwesomeIcon>
        <span className='font-semibold text-xl'>{reviews}</span>
      </div>
    </div>
  );
};

export default AsignaturaTab;
