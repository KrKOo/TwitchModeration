import React from 'react';
import styles from './Screen.module.scss';


function Screen(props: {className: string, children: React.ReactNode}) {
  return (
    <div className={`${styles.Screen} ${props.className || ""}`}>
      {props.children}
    </div>
  );
}

export default Screen;
