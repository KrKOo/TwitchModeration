import React from 'react'
import styles from './StreamOverlay.module.scss';
import socketIOClient from 'socket.io-client';

function StreamOverlay() {
  const [response, setResponse] = React.useState("Ahoj");

  React.useEffect(() => {
    const socket = socketIOClient("/");
    socket.on("message", data => {
      setResponse(data.message);
    });
  });

  return (
    <div className={styles.StreamOverlay}>
      {response}
    </div >
  );
}

export default StreamOverlay;
