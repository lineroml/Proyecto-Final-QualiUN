'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ColorRing } from 'react-loader-spinner';
import {
  faUser,
  faDownload,
  faHeartBroken,
  faArrowLeft,
  faPlay,
} from '@fortawesome/free-solid-svg-icons';

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

export const dynamic = 'force-dynamic';

const CustomButton = ({
  type = 1,
  textS = 1,
  width = null,
  text = 'Log In',
  icon = 'user',
  disabled = false,
  loading = false,
  action = () => {
    console.log('Button clicked');
  },
  href = null,
}) => {
  return (
    <button
      onClick={action}
      className={`${styles[type]} ${textSize[textS]} ${width ?? 'w-fit'}
      ${disabled ? 'cursor-not-allowed bg-pewter-blue' : 'cursor-pointer'}
      px-4 py-2 rounded-md font-semibold text-center items-center justify-center flex`}
      disabled={disabled}
    >
      {' '}
      {icon === 'user' ? (
        <FontAwesomeIcon icon={faUser} className='mr-2'></FontAwesomeIcon>
      ) : icon === 'download' ? (
        <FontAwesomeIcon icon={faDownload} className='mr-2'></FontAwesomeIcon>
      ) : icon === 'none' ? (
        ''
      ) : icon === 'arrow-left' ? (
        <FontAwesomeIcon icon={faArrowLeft} className='mr-2'></FontAwesomeIcon>
      ) : icon === 'play' ? (
        <FontAwesomeIcon icon={faPlay} className='mr-2'></FontAwesomeIcon>
      ) : (
        <FontAwesomeIcon icon={faHeartBroken} className='mr-2'></FontAwesomeIcon>
      )}
      {loading ? (
        <ColorRing
          colors={['#315098', '#FBD0E0', '#AFBDB0', '#1E1E1E', '#8CA8BE']}
          height={30}
          width={30}
        />
      ) : (
        text
      )}
    </button>
  );
};

export default CustomButton;
