import React from 'react';
import logo from '../../assets/images/logo.svg';
import styles from './Header.module.scss';

function Header(props) {

  return (
    <header className={styles.Header}>
      <img src={logo} alt="logo" />

      <nav>
        <ul>
          <li onClick={() => props.onClick(0)}>Home</li>
          <li onClick={() => props.onClick(1)}>About</li>
          <li onClick={() => props.onClick(2)}>How it works?</li>
          <li onClick={() => props.onClick(3)}>Log In</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
