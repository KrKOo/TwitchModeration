import React, { ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react'
import styles from './Resizable.module.scss'

export interface ResizableEvent {
}

export interface ResizableProps {
  children?: ReactNode;
  width: number;
  height: number;
  onResize?: (e: ResizableEvent) => void;
  onStop?: (e: ResizableEvent) => void;
  [rest: string]: any;
};

const Resizable = React.forwardRef((props: ResizableProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  const { children, width: widthProp, height: heightProp, onResize, onStop, ...rest } = props;

  const [width, setWidth] = useState<number | undefined>(100)
  const [height, setHeight] = useState<number | undefined>(100)

  let dir = useRef()
  let resizing = useRef(false);

  console.log(resizing)

  const mouseMove = useCallback((e: any) => {
    console.log('asdf')
  }, [])

  const handleMouseUp = useCallback((e: any) => {
    if (resizing.current) {
      document.removeEventListener('mousemove', mouseMove);
      //onStop && onStop({ deg: latestRotation.current })
      resizing.current = false
      dir.current = undefined
      console.log("STOP RESIZE")
    }
  }, [mouseMove]);

  const handleMouseDown = (e: any) => {
    e.preventDefault();
    document.addEventListener('mousemove', mouseMove);
    dir.current = e.target.getAttribute('data-dir')
    resizing.current = true;
    console.log("START RESIZE")
  }

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseUp])

  let newChildren: any;
  if (React.isValidElement(children))
    newChildren = React.cloneElement(children, { style: { display: 'block', height: '100%' } })

  return <div ref={ref} className={styles.Resizable} {...rest} style={{ ...rest.style, ...{ width: 100, height: height } }} >
    <div data-dir='up' className={`${styles.Edge} ${styles.topEdge}`} onMouseDown={handleMouseDown}></div>
    <div data-dir='right' className={`${styles.Edge} ${styles.rightEdge}`} onMouseDown={handleMouseDown}></div>
    <div data-dir='down' className={`${styles.Edge} ${styles.bottomEdge}`} onMouseDown={handleMouseDown}></div>
    <div data-dir='left' className={`${styles.Edge} ${styles.leftEdge}`} onMouseDown={handleMouseDown}></div>

    {newChildren}
  </div >
});

export default Resizable;
