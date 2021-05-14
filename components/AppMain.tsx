import React from 'react';
import Header from './Header';
import Movies from './Movies';
import PaginationBtns from './PaginationBtns';
import SortBy from './SortBy';
import { useRouter } from 'next/router';

const AppMain = ({ data, pathname, currentQuery, page }) => {
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

  const handleSearchVal = (val) => {
    currentQuery.search = val;
    router.push({ pathname, query: currentQuery });
  };

  return (
    <div className="container">
      <Header handleSearchVal={handleSearchVal} />
      <SortBy />
      <Movies data={data} />
      <PaginationBtns plusPage={plusPage} minusPage={minusPage} page={Number(currentQuery.page)} />
    </div>
  );
};

export default AppMain;
