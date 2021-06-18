import React, { useRef } from 'react';
import styles from './Home.module.scss';
import Header from '../../components/Header/Header'
import HomeScreen from './Components/HomeScreen/HomeScreen'
import AboutScreen from './Components/AboutScreen/AboutScreen';
import HowItWorksScreen from './Components/HowItWorksScreen/HowItWorksScreen';

function Home() {
  const [viewHeight, setViewHeight] = React.useState(window.innerHeight);
  const [screenID, setScreenID] = React.useState(0);

  React.useEffect(() => {
    function handleResize() {
      setViewHeight(window.innerHeight)
    }
    window.addEventListener('resize', handleResize);

    scrollToScreen(screenID);
  });

  function scrollToScreen(id) {
    window.scrollTo(0, viewHeight * id);
  }

  return (
    <div className={styles.Home}>
      <Header onClick={setScreenID} />

      <HomeScreen />
      <AboutScreen />
      <HowItWorksScreen />
    </div>
  );
}

export default Home;
