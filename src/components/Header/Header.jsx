import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './header.module.scss';

const Header = () => {
  return (
    <ul className={styles.list}>
      <li className={styles.item}>
        <NavLink
          to="/arduino"
          activeStyle={{
            fontWeight: 'bold',
            color: '#0c93f8',
          }}
        >
          Ардуино
        </NavLink>
      </li>
      <li className={styles.item}>
        <NavLink
          to="/drone"
          activeStyle={{
            fontWeight: 'bold',
            color: '#0c93f8',
          }}
        >
          Дрон
        </NavLink>
      </li>
    </ul>
  );
};

export default Header;
