import styles from './Screen.module.scss';

function Screen(props) {
  return (
    <div className={`${styles.Screen} ${props.className || ""}`}>
      {props.children}
    </div>
  );
}

export default Screen;
