import React from 'react';

import arrowSvg from '../assets/images/arrow.svg';
import styles from '../styles/pagination.module.scss';

interface IPaginationBtns {
  plusPage: () => void;
  minusPage: () => void;
  page: number;
}

const PaginationBtns: React.FC<IPaginationBtns> = ({ plusPage, minusPage, page }) => {
  return (
    <div className={styles.paginationBox}>
      {page > 1 && (
        <button className={styles.paginationBtnPrev} onClick={() => minusPage()}>
          <img src={arrowSvg} alt="arrowSvg" />
          Prev page
        </button>
      )}
      <button className={styles.paginationBtnNext} onClick={() => plusPage()}>
        Next page
        <img src={arrowSvg} alt="arrowSvg" />
      </button>
    </div>
  );
};

export default PaginationBtns;
