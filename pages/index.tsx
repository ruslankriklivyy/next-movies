import React from 'react';
import { useRouter } from 'next/router';

import AppMain from '../components/AppMain';
import { IMovieGenreProps } from '../interfaces/interfaces';

const Index: React.FC<IMovieGenreProps> = ({ data, page, genres }) => {
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

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const search = query.search || '';
  const res = await fetch(
    `${process.env.HOST}${search !== '' ? '/search' : ''}/movie${
      search !== '' ? '' : `/now_playing`
    }${process.env.API_KEY}${search !== '' ? `&query=${search}` : ''}${
      query.genreId ? `&with_genres=${query.genreId}` : ''
    }&sort_by=${query.sortName ? query.sortName : ''}.desc&page=${page}`,
  );
  const resGenres = await fetch(`${process.env.HOST}/genre/movie/list${process.env.API_KEY}`);

  const data = await res.json();
  const genres = await resGenres.json();

  return {
    props: { data, page, genres: [...genres.genres] },
  };
}

export default Index;
