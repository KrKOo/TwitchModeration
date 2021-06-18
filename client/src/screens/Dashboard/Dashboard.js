import styles from './Dashboard.module.scss';
import Header from '../../components/Header/Header';
import StreamOverlay from './Components/StreamOverlay/StreamOverlay';

function Dashboard() {
  return (
    <div className={styles.Dashboard}>
      <Header />
      <StreamOverlay />

    </div>
  );
}

export default Dashboard;
