import React from 'react';
import Link from 'next/link';

import styles from '../styles/movies.module.scss';
import { IMoviesResult } from '../interfaces/interfaces';
import starSvg from '../assets/images/star.svg';

const Movies = ({ data }) => {
  return (
    <div className={styles.movies}>
      <h2 className={styles.title}>New films</h2>
      <div className={styles.moviesItem}>
        {data.results?.map((item: IMoviesResult) => (
          <Link href={`/movie/${item.id}`} key={item.id}>
            <a href={`/movie/${item.id}`}>
              <img
                src={item.poster_path && `https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                alt="poster img"
                className={styles.moviesImage}
              />
              <h4>{item.title}</h4>

              <div className={styles.moviesBottom}>
                <span>{new Date(item.release_date).getFullYear()}</span>
                <div className={styles.moviesRating}>
                  <img src={starSvg} alt="star svg" />
                  <span>{item.vote_average}</span>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Movies;
