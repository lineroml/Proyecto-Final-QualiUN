'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

export const dynamic = 'force-dynamic';

const Stat = ({ stat, center = false, size = '2xl' }) => {
  const tooltip = (desc, hasReviews) => {
    if (hasReviews) {
      return desc;
    } else {
      return desc + ' (No hay reseñas en esta categoría para el curso aún)';
    }
  };
  const centerClass = center
    ? 'items-center'
    : 'med-lg:items-start items-center';
  return (
    <div className={`flex flex-col ${centerClass}`}>
      <h1
        data-tooltip-content={tooltip(stat.desc, stat.count > 0)}
        data-tooltip-id='my-tooltip'
        className={`w-fit text-${size} font-semibold`}
      >
        {stat.name}
      </h1>
      <div className='flex flex-row'>
        <Tooltip
          className='max-w-lg text-sm drop-shadow-sm border border-black/10 bg-white text-black'
          id='my-tooltip'
          multiline={true}
        />

        {[...Array(Math.floor(stat.value))].map((_, i) => (
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            className={`text-${size} text-chinese-blue`}
          ></FontAwesomeIcon>
        ))}
        {stat.value % 1 !== 0 && (
          <FontAwesomeIcon
            icon={faStarHalfStroke}
            className={`text-${size} text-chinese-blue`}
          ></FontAwesomeIcon>
        )}
        {[...Array(5 - Math.ceil(stat.value))].map((_, i) => (
          <FontAwesomeIcon
            key={i}
            icon={faStarEmpty}
            className={`text-${size} text-chinese-blue`}
          ></FontAwesomeIcon>
        ))}
        {stat.count > 0 &&
          stat.value !== 0 &&
          Math.round(stat.value * 100) / 100}
      </div>
    </div>
  );
};

export default Stat;
