import React from 'react';
import { useRouter } from 'next/router';
import AppMain from '../components/AppMain';

const Index = ({ data, page }) => {
  const { query, pathname } = useRouter();
  const currentQuery = { ...query };

  return <AppMain data={data} page={page} currentQuery={currentQuery} pathname={pathname} />;
};

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=74d41124b9d3bafd09d832463dd78216&page=${page}`,
  );
  const data = await res.json();

  return {
    props: { data, page },
  };
}

export default Index;
