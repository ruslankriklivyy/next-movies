import React, { useState } from 'react';

import logoPng from '../assets/images/Okko.png';
import searchSvg from '../assets/images/loupe.svg';
import enterSvg from '../assets/images/enter.svg';

import styles from '../styles/header.module.scss';

const Header = ({ handleSearchVal }) => {
  const [searchValue, setSearchValue] = useState('');

  const onSendSearchVal = () => {
    setSearchValue(searchValue);
    handleSearchVal(searchValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSendSearchVal();
    }
  };

  return (
    <header>
      <div className={styles.header}>
        <a href="/" className={styles.logo}>
          <img src={logoPng} alt="logo png" />
        </a>
        <div className={styles.header__right}>
          <div className={styles.search}>
            <input
              type="text"
              placeholder="Search movie by name"
              value={searchValue}
              onChange={(e: any) => setSearchValue(e.target.value)}
              onKeyDown={(e: any) => handleKeyDown(e)}
            />
            <button onClick={() => onSendSearchVal()}>
              <img src={searchSvg} alt="search svg" />
            </button>
          </div>
          <div className={styles.enter}>
            <button>
              <img src={enterSvg} alt="enter svg" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
