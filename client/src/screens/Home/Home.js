import logo from '../../components/images/logo.svg';
import './Home.scss';
import Header from '../../components/Header/Header'

function Home() {
  return (
    <div className="Home">
      <Header />
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <p>
          Edit <code>src/Home.js</code> and save to reload.
        </p>
        <a
          className="Home-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Random button
        </a>
      </header>
    </div>
  );
}

export default Home;
