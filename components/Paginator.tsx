import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import createPages from '../utils/createPages';
import { RootState } from '../reducers';
import styles from '../styles/paginator.module.scss';

interface PaginatorType {
  onSelectPage: (num: number) => void;
  currentPage: number;
}

const Paginator: React.FC<PaginatorType> = ({ currentPage, onSelectPage }) => {
  const { totalPages } = useSelector((state: RootState) => state.movies);
  const perPage = 5;
  const countPages = Math.ceil(totalPages / perPage);
  const pages: Array<number> = [];
  createPages(pages, countPages, currentPage - 1);

  return (
    <nav>
      <ul className={styles.paginator}>
        {pages.map((num, index) => (
          <li
            key={`${num}-${index}`}
            onClick={() => onSelectPage(num)}
            className={classNames('page-item', {
              active: num === currentPage,
            })}>
            {num}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginator;
