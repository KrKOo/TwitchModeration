import UserContext from 'modules/context/userContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import styles from './Header.module.scss';

const Header = (props: { onClick: (buttonID: number) => void }) => {
  const { user } = useContext(UserContext)

  return (
    <header className={styles.Header}>
      <img src={logo} alt="logo" />

      <nav>
        <ul>
          {user.isLogged && <li><Link to="/dashboard" className={styles.LoginButton}>Dashboard</Link></li>}
          <li><button onClick={() => props.onClick(0)}>Home</button></li>
          <li><button onClick={() => props.onClick(1)}>About</button></li>
          <li><button onClick={() => props.onClick(2)}>How it works?</button></li>
          <li><Link to="/login" className={styles.LoginButton}>Log In</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
