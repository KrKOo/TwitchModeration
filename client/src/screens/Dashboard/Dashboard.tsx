import React from 'react';
import styles from './Dashboard.module.scss';
import StreamOverlay from './Components/StreamOverlay/StreamOverlay';
import UserContext from 'modules/context/userContext';

function Dashboard() {
  const user = React.useContext(UserContext)

  return (
    <div className={styles.Dashboard}>
      {user.username}
      <img src={user.picture} alt="profilePic" />
      <StreamOverlay />
    </div>
  );
}

export default Dashboard;

