import React from 'react';
import logo from '../images/logo.svg';
import './Header.scss';

class Header extends React.Component {
  handleClick = (e) => {
    console.log(e);
  }

  render() {
    return (
      <header className="Header">
        <img src={logo} className="Header-logo" alt="logo" />

        <nav>
          <ul>
            <li onClick={this.handleClick}>Home</li>
            <li onClick={this.handleClick}>About</li>
            <li onClick={this.handleClick}>How it works?</li>
            <li onClick={this.handleClick}>Log In</li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
