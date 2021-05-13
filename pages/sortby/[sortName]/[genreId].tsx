import React from 'react';
import Header from '../../../components/Header';
import Movies from '../../../components/Movies';
import SortBy from '../../../components/SortBy';
import { IMoviesResult } from '../../../interfaces/interfaces';

const MovieGenre = ({ data }) => {
  return (
    <>
      <div className="container">
        <Header />
        <SortBy />
        <Movies data={data} />
      </div>
    </>
  );
};

export async function getServerSideProps({ query, req }) {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=74d41124b9d3bafd09d832463dd78216&with_genres=${query.genreId}&sort_by=${query.sortName}.desc&certification_country=US&language=en-US`,
  );
  const data: IMoviesResult[] = await res.json();

  return {
    props: {
      data,
    },
  };
}

export default MovieGenre;
