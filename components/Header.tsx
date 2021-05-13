import React from 'react';

import logoPng from '../assets/images/Okko.png';
import searchSvg from '../assets/images/loupe.svg';
import enterSvg from '../assets/images/enter.svg';

import styles from '../styles/header.module.scss';

const Header = () => {
  return (
    <header>
      <div className={styles.header}>
        <a href="/" className={styles.logo}>
          <img src={logoPng} alt="logo png" />
        </a>
        <div className={styles.header__right}>
          <div className={styles.search}>
            <input type="text" placeholder="Search movie by name" />
            <button>
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
