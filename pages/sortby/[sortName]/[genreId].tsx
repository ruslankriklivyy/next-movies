import React from 'react';
import { useRouter } from 'next/router';
import { IMoviesResult } from '../../../interfaces/interfaces';
import AppMain from '../../../components/AppMain';

const MovieGenre = ({ data, page }) => {
  const { query, pathname } = useRouter();
  const currentQuery = { ...query };

  return <AppMain data={data} page={page} currentQuery={currentQuery} pathname={pathname} />;
};

export async function getServerSideProps({ query, req }) {
  const page = query.page || 1;
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=74d41124b9d3bafd09d832463dd78216&with_genres=${query.genreId}&sort_by=${query.sortName}.desc&page=${page}`,
  );
  const data: IMoviesResult[] = await res.json();

  return {
    props: {
      data,
      page,
    },
  };
}

export default MovieGenre;
