import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { getGenres } from '../actions';
import { RootState } from '../reducers';

import moreSvg from '../assets/images/more.svg';
import sortSvg from '../assets/images/sort.svg';
import starSvg from '../assets/images/star.svg';
import azSvg from '../assets/images/az.svg';
import popularSvg from '../assets/images/popular.svg';
import styles from '../styles/sortBy.module.scss';
import { ISortByArr } from '../interfaces/interfaces';

const sortByArr: ISortByArr[] = [
  { id: 0, name: 'Default', img: sortSvg, type: 'popularity' },
  { id: 1, name: 'Rating', img: starSvg, type: 'vote_average' },
  { id: 3, name: 'A-Z', img: azSvg, type: 'title' },
  { id: 4, name: 'Release date', img: popularSvg, type: 'release_date' },
];

const SortBy = () => {
  const dispatch = useDispatch();
  const { genres } = useSelector((state: RootState) => state.movies);
  const [visibleGenres, setVisibleGenres] = useState(false);
  const [visibleSortBy, setVisibleSortBy] = useState(false);

  const { query } = useRouter();

  const closeVisibleGenres = () => {
    setVisibleGenres(false);
  };

  const closeVisilbeSortBy = () => {
    setVisibleSortBy(false);
  };

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const escapeListener = React.useCallback(
    (e) => {
      if (e.key === 'Escape') {
        closeVisibleGenres();
        closeVisilbeSortBy();
      }
    },
    [closeVisibleGenres],
  );
  const clickListener = React.useCallback(
    (e) => {
      if (e.target.className) {
        closeVisibleGenres();
        closeVisilbeSortBy();
      }
    },
    [closeVisibleGenres],
  );
  React.useEffect(() => {
    document.addEventListener('click', clickListener);
    document.addEventListener('keyup', escapeListener);
    return () => {
      document.removeEventListener('click', clickListener);
      document.removeEventListener('keyup', escapeListener);
    };
  }, [clickListener, escapeListener]);

  return (
    <div className={styles.sortby}>
      <div className={styles.sortbyItem}>
        <h4 className={styles.sortbyName}>By genre :</h4>
        <div className={styles.sortbyBox}>
          {genres.length > 0 &&
            genres.slice(0, 6).map((item) => (
              <Link href={`/sortby/${query.sortName ?? 'popularity'}/${item.id}`} key={item.id}>
                <a
                  className={
                    Number(item.id) === Number(query.genreId) ? styles.active : styles.sortbyGenre
                  }
                  href={`/sortby/${query.sortName ?? 'popularity'}/${item.id}`}>
                  {item.name}
                </a>
              </Link>
            ))}
          <button className={styles.moreButton} onClick={() => setVisibleGenres(!visibleGenres)}>
            <img src={moreSvg} alt="more svg" />
          </button>
          {visibleGenres && (
            <div className={styles.moreGenres}>
              {genres.length > 0 &&
                genres.slice(6).map((item) => (
                  <Link href={`/sortby/${query.sortName ?? 'popularity'}/${item.id}`} key={item.id}>
                    <a
                      className={
                        Number(item.id) === Number(query.genreId)
                          ? styles.active
                          : styles.sortbyGenre
                      }
                      href={`/sortby/${query.sortName ?? 'popularity'}/${item.id}`}>
                      {item.name}
                    </a>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.sortbyItem}>
        <h4 className={styles.sortbyName}>Sort by :</h4>
        <div className={styles.sortbyChose} onClick={() => setVisibleSortBy(!visibleSortBy)}>
          <img src={sortSvg} alt="sort svg" />
          <span>Default</span>
        </div>
        {visibleSortBy && (
          <div className={styles.sortbyMore}>
            {sortByArr.map((item) => (
              <Link href={`/sortby/${item.type.toLowerCase()}/${query.genreId}`} key={item.id}>
                <a
                  href={`/sortby/${item.type.toLowerCase()}/${query.genreId}`}
                  className={styles.sortbyMoreItem}
                  key={item.id}
                  onClick={() => setVisibleSortBy(!visibleSortBy)}>
                  <img src={item.img} alt="sort svg" />
                  <span>{item.name}</span>
                </a>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SortBy;
