import React from 'react';
import logo from '../../../components/images/logo.svg';
import './Header.scss';

class Header extends React.Component {
  render() {
    <header className="Header">
      <img src={logo} className="Header-logo" alt="logo" />

      <nav>
        <ul>
          <li onClick={this.handleClick(e)}></li>
        </ul>
      </nav>

      <a
        className="Home-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Random button
        </a>
    </header>
  }
}

export default Home;
