import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const styles = {
  1: 'bg-chinese-blue text-white hover:bg-pewter-blue',
  2: 'bg-white text-chinese-blue border-4 border-chinese-blue hover:bg-chinese-blue hover:text-white',
};

const textSize = {
  1: 'text-xl',
  2: 'text-lg',
  3: 'text-base',
  4: 'text-sm',
};

const CustomButton = ({
  type = 1,
  textS = 1,
  width = null,
  height = null,
  text = 'Log In',
  icon = 'user',
}) => {
  return (
    <button
      className={`${styles[type]} ${textSize[textS]} ${
        width ?? 'w-fit'
      } px-4 py-2 rounded-md font-semibold`}
    >
      {' '}
      {icon === 'user' ? (
        <FontAwesomeIcon icon={faUser} className='mr-2'></FontAwesomeIcon>
      ) : (
        <FontAwesomeIcon icon={faDownload} className='mr-2'></FontAwesomeIcon>
      )}
      {text}
    </button>
  );
};

export default CustomButton;
