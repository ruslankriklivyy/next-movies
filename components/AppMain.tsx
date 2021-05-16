import React from 'react';
import Header from './Header';
import Movies from './Movies';
import PaginationBtns from './PaginationBtns';
import SortBy from './SortBy';
import { useRouter } from 'next/router';
import { IMovieGenreProps } from '../interfaces/interfaces';

interface IAppMainProps extends IMovieGenreProps {
  pathname: string;
  currentQuery: any;
}

const AppMain: React.FC<IAppMainProps> = ({ data, pathname, currentQuery, page, genres }) => {
  const router = useRouter();

  const plusPage = () => {
    currentQuery.page = String(Number(page) + 1);
    router.push({ pathname, query: currentQuery });
  };

  const minusPage = () => {
    if (Number(currentQuery.page) >= 1) {
      currentQuery.page = String(Number(page) - 1);
      router.push({ pathname, query: currentQuery });
    }
  };

  const handleSearchVal = (val: string) => {
    if (val !== '') {
      currentQuery.search = val;
      router.push({ pathname, query: currentQuery });
    }
  };

  return (
    <div className="container">
      <Header handleSearchVal={handleSearchVal} />
      <SortBy genres={genres} />
      <Movies data={data} />
      <PaginationBtns plusPage={plusPage} minusPage={minusPage} page={Number(currentQuery.page)} />
    </div>
  );
};

export default AppMain;
