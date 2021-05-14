import React from 'react';
import { useRouter } from 'next/router';
import AppMain from '../components/AppMain';

const Index = ({ data, page, search }) => {
  const { query, pathname } = useRouter();
  const currentQuery = { ...query };

  return <AppMain data={data} page={page} currentQuery={currentQuery} pathname={pathname} />;
};

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const search = query.search || '';
  const res = await fetch(
    `https://api.themoviedb.org/3${search !== '' ? '/search' : ''}/movie${
      search !== '' ? '' : `/now_playing`
    }?api_key=74d41124b9d3bafd09d832463dd78216&query=${search}${
      query.genreId ? `&with_genres=${query.genreId}` : ''
    }&sort_by=${query.sortName ? query.sortName : ''}.desc&page=${page}`,
  );
  const data = await res.json();

  return {
    props: { data, page, search },
  };
}

export default Index;
