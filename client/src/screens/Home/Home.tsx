import React from 'react';
import styles from './Home.module.scss';
import Header from '../../components/Header/Header'
import HomeScreen from './Components/HomeScreen/HomeScreen'
import AboutScreen from './Components/AboutScreen/AboutScreen';
import HowItWorksScreen from './Components/HowItWorksScreen/HowItWorksScreen';

const Home = () => {
  const [viewHeight, setViewHeight] = React.useState(window.innerHeight);
  const [screenID, setScreenID] = React.useState(0);

  const scrollToScreen = (id: number) => {
    window.scrollTo({ left: 0, top: viewHeight * id, behavior: 'smooth' });
  }

  React.useEffect(() => {
    function handleResize() {
      setViewHeight(window.innerHeight)
    }
    window.addEventListener('resize', handleResize);

    scrollToScreen(screenID);
  });


  return (
    <div className={styles.Home}>
      <Header onClick={(buttonID: number) => setScreenID(buttonID)} />

      <HomeScreen />
      <AboutScreen />
      <HowItWorksScreen />
    </div>
  );
}

export default Home;
