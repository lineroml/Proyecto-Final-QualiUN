'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

const Stat = ({ stat }) => {
  return (
    <div className='flex flex-col'>
      <h1
        data-tooltip-content={stat.desc}
        data-tooltip-id='my-tooltip'
        className='w-fit text-2xl font-semibold'
      >
        {stat.name}
      </h1>
      <div className='flex flex-row'>
        <Tooltip
          className='text-sm drop-shadow-sm border border-black/10 bg-white text-black'
          id='my-tooltip'
        />

        {[...Array(Math.floor(stat.value))].map((_, i) => (
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            className='text-2xl text-chinese-blue'
          ></FontAwesomeIcon>
        ))}
        {stat.value % 1 !== 0 && (
          <FontAwesomeIcon
            icon={faStarHalfStroke}
            className='text-2xl text-chinese-blue'
          ></FontAwesomeIcon>
        )}
        {[...Array(5 - Math.ceil(stat.value))].map((_, i) => (
          <FontAwesomeIcon
            key={i}
            icon={faStarEmpty}
            className='text-chinese-blue text-2xl'
          ></FontAwesomeIcon>
        ))}
      </div>
    </div>
  );
};

export default Stat;
