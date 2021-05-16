import React from 'react';
import { useRouter } from 'next/router';
import { NextApiRequest, NextApiResponse } from 'next';

import { IMovieGenreProps } from '../../../interfaces/interfaces';
import AppMain from '../../../components/AppMain';

const MovieGenre: React.FC<IMovieGenreProps> = ({ data, page, genres }) => {
  const { query, pathname } = useRouter();
  const currentQuery = { ...query };

  return (
    <AppMain
      genres={genres}
      data={data}
      page={page}
      currentQuery={currentQuery}
      pathname={pathname}
    />
  );
};

export async function getServerSideProps(
  req: NextApiRequest,
  res: NextApiResponse<IMovieGenreProps>,
) {
  const { query } = req;
  const page = query.page || 1;
  const search = query.search || '';
  const resData = await fetch(
    `${process.env.HOST}/discover/movie${process.env.API_KEY}${
      query.genreId ? `&with_genres=${query.genreId}` : ''
    }&sort_by=${query.sortName ? query.sortName : ''}.desc&page=${page}`,
  );
  const resGenres = await fetch(`${process.env.HOST}/genre/movie/list${process.env.API_KEY}`);

  const data = await resData.json();
  const genres = await resGenres.json();

  return {
    props: {
      data,
      page,
      genres: [...genres.genres],
    },
  };
}

export default MovieGenre;
