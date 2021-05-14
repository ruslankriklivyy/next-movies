import React from 'react';
import { useRouter } from 'next/router';
import { NextApiRequest, NextApiResponse } from 'next';

import { IMoviesResult } from '../../../interfaces/interfaces';
import AppMain from '../../../components/AppMain';

const MovieGenre = ({ data, page, search }) => {
  const { query, pathname } = useRouter();
  const currentQuery = { ...query };

  return <AppMain data={data} page={page} currentQuery={currentQuery} pathname={pathname} />;
};

export async function getServerSideProps(
  req: NextApiRequest,
  res: NextApiResponse<IMoviesResult[]>,
) {
  const { query } = req;
  const page = query.page || 1;
  const search = query.search || '';
  const resData = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=74d41124b9d3bafd09d832463dd78216${
      query.genreId ? `&with_genres=${query.genreId}` : ''
    }&sort_by=${query.sortName ? query.sortName : ''}.desc&page=${page}`,
  );
  const data: IMoviesResult[] = await resData.json();

  return {
    props: {
      data,
      page,
      search,
    },
  };
}

export default MovieGenre;
