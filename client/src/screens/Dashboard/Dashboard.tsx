import styles from './Dashboard.module.scss';
import StreamOverlay from './Components/StreamOverlay/StreamOverlay';

function Dashboard() {
  return (
    <div className={styles.Dashboard}>
      <StreamOverlay />
    </div>
  );
}

export default Dashboard;
