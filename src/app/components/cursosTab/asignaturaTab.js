import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const AsignaturaTab = ({ idAsig, codigo, nombre, reviews }) => {
  return (
    <div
      key={idAsig}
      className='bg-white cursor-pointer rounded-xl border-dashed border-2 border-chinese-blue w-full h-[94px] flex p-4'
    >
      <div className='w-[80%] bg-lime-300 h-full'>
        <span className='font-semibold text-chinese-blue w-full h-fit'>{codigo}</span>
        <h2 className='font-semibold text-xl w-full h-fit'>{nombre}</h2>
      </div>
      <div className='w-[20%] bg-lime-700 h-full flex items-center justify-end gap-2'>
        <FontAwesomeIcon icon={faStar} className='text-xl text-chinese-blue'></FontAwesomeIcon>
        <span className='font-semibold text-xl'>{reviews}</span>
      </div>
    </div>
  );
};

export default AsignaturaTab;
