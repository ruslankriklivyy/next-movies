import React from 'react';
import Header from '../components/Header';
import Movies from '../components/Movies';
import SortBy from '../components/SortBy';

const Index = ({ data }) => {
  return (
    <div className="container">
      <Header />
      <SortBy />
      <Movies data={data} />
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=74d41124b9d3bafd09d832463dd78216`,
  );
  const data = await res.json();

  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default Index;
