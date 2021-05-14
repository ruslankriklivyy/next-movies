import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import Head from 'next/head';
import { NextApiRequest, NextApiResponse } from 'next';
import { useDispatch, useSelector } from 'react-redux';

import { IMoviesResult } from '../../../interfaces/interfaces';
import { RootState } from '../../../reducers';
import { getCredits, getMovieTrailer } from '../../../actions';
import styles from '../../../styles/moviePage.module.scss';

import halfStarSvg from '../../../assets/images/star-half.svg';
import emptyStarSvg from '../../../assets/images/empty-star.svg';
import fullStarSvg from '../../../assets/images/star.svg';
import cancelSvg from '../../../assets/images/cancel.svg';
import playSvg from '../../../assets/images/play.svg';
import defaultMoviePng from '../../../assets/images/default-movie.png';
import priceConvert from '../../../utils/priceConvert';

interface IMovieDetailsCountry {
  name: string;
}
interface IMovieDetails extends IMoviesResult {
  budget: number;
  production_countries: IMovieDetailsCountry[];
}
interface IMoviePageProps {
  data: IMovieDetails;
}

const MoviePage: React.FC<IMoviePageProps> = ({ data }) => {
  const dispatch = useDispatch();
  const { chosenMovieTrailer, creditsMovie } = useSelector((state: RootState) => state.movies);
  const [visibleTrailer, setVisibleTrailer] = useState(false);

  console.log(creditsMovie);

  const closeVisibleTrailer = () => {
    setVisibleTrailer(false);
  };

  useEffect(() => {
    dispatch(getMovieTrailer(data.id));
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(getCredits(data.id));
  }, [dispatch, data]);

  const escapeListener = React.useCallback(
    (e) => {
      if (e.key === 'Escape') {
        closeVisibleTrailer();
      }
    },
    [closeVisibleTrailer],
  );
  const clickListener = React.useCallback(
    (e) => {
      if (e.target.className) {
        closeVisibleTrailer();
      }
    },
    [closeVisibleTrailer],
  );
  React.useEffect(() => {
    document.addEventListener('click', clickListener);
    document.addEventListener('keyup', escapeListener);
    return () => {
      document.removeEventListener('click', clickListener);
      document.removeEventListener('keyup', escapeListener);
    };
  }, [clickListener, escapeListener]);

  React.useEffect(() => {
    visibleTrailer
      ? document.querySelector<HTMLElement>('body')?.setAttribute('style', 'overflow: hidden')
      : document.querySelector<HTMLElement>('body')?.setAttribute('style', 'overflow: auto');
  }, [visibleTrailer]);

  return (
    <div className={styles.movie}>
      <Head>
        <title>Next Movies | {data.title}</title>
      </Head>
      {visibleTrailer && (
        <div className={styles.trailer}>
          <div className={styles.trailerBox}>
            <button className={styles.trailerCancel} onClick={() => closeVisibleTrailer()}>
              <img src={cancelSvg} alt="cancel svg" />
            </button>
            <iframe
              data-frameborder="0"
              data-allowfullscreen
              title="trailer"
              width="468"
              height="460"
              src={`https://www.youtube.com/embed/${
                chosenMovieTrailer?.length > 0 && chosenMovieTrailer[0].key
              }?showinfo=0`}></iframe>
          </div>
        </div>
      )}
      <div className="container">
        <h2 className={styles.movieName}>{data.title}</h2>
        <div className={styles.movieTop}>
          <div className={styles.movieLeft}>
            <img
              src={
                data.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
                  : defaultMoviePng
              }
              alt="movie img"
            />
          </div>
          <div className={styles.movieRight}>
            <div className={styles.movieRightActions}>
              <button onClick={() => setVisibleTrailer(true)}>
                <img src={playSvg} alt="play svg" /> Trailer
              </button>
              <button>
                <img src={fullStarSvg} alt="star svg" /> Add to favorites
              </button>
            </div>
            <div className={styles.movieRightRating}>
              <ReactStars
                count={10}
                isHalf={true}
                size={30}
                value={data.vote_average}
                activeColor="#fff"
                emptyIcon={<img className="rate" src={emptyStarSvg} alt="star svg" />}
                halfIcon={<img className="rate" src={halfStarSvg} alt="star svg" />}
                filledIcon={<img className="rate" src={fullStarSvg} alt="star svg" />}
              />
              <span>{data.vote_average}</span>
            </div>
            <div className={styles.movieRightInfo}>
              <div className={styles.movieRightInfoItem}>
                <span>Year</span>
                <p>{new Date(data.release_date).getFullYear()}</p>
              </div>
              <div className={styles.movieRightInfoItem}>
                <span>Budget</span>
                <p>{priceConvert(data.budget)}$</p>
              </div>
              <div className={styles.movieRightInfoItem}>
                <span>Country</span>
                <div className={styles.movieRightInfoGenres}>
                  {data.production_countries.map((item) => (
                    <p key={item.name}>{item.name}</p>
                  ))}
                </div>
              </div>
              <div className={styles.movieRightInfoItem}>
                <span>Genres</span>
                <div className={styles.movieRightInfoGenres}>
                  {data.genres.map((item) => (
                    <p key={item.id}>{item.name}</p>
                  ))}
                </div>
              </div>
              <div className={styles.movieRightInfoItem}>
                <span>Director</span>
                <div className={styles.movieRightInfoGenres}>
                  {creditsMovie?.crew.map(
                    (item) => item.job === 'Director' && <p key={item.id}>{item.name}</p>,
                  )}
                </div>
              </div>
              <div className={styles.movieRightInfoItem}>
                <span>Casts</span>
                <div className={styles.movieRightInfoGenres}>
                  {creditsMovie?.cast.slice(0, 5).map((item) => (
                    <p key={item.id}>{item.name}</p>
                  ))}
                  ...
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.movieBottom}>
          <p className={styles.movieDescription}>{data.overview}</p>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(req: NextApiRequest, res: NextApiResponse<IMoviesResult>) {
  const resData = await fetch(
    `https://api.themoviedb.org/3/movie/${req.query.id}?api_key=74d41124b9d3bafd09d832463dd78216`,
  );
  const data: IMoviesResult = await resData.json();

  return {
    props: {
      data,
    },
  };
}

export default MoviePage;
