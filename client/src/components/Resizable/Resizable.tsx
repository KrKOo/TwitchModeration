import React, { Fragment, ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react'
import styles from './Resizable.module.scss'

export interface ResizableEvent {
}

export interface ResizableProps {
  children?: ReactNode;
  nodeRef?: React.RefObject<HTMLDivElement>;
  onResize?: (e: ResizableEvent) => void;
  onStop?: (e: ResizableEvent) => void;
  [rest: string]: any;
};

const Resizable = (props: ResizableProps) => {
  const { children, width: widthProp, height: heightProp, onResize, onStop, nodeRef, ...rest } = props;

  const [scaleX, setScaleX] = useState<number>(1)
  const [scaleY, setScaleY] = useState<number>(1)

  let resizing = useRef(false);

  const mouseMove = useCallback((e: any) => {
    console.log('asdf')
  }, [])

  const handleMouseUp = useCallback((e: any) => {
    if (resizing.current) {
      document.removeEventListener('mousemove', mouseMove);
      onStop && onStop({ scaleX, scaleY })
      resizing.current = false
      console.log("STOP RESIZE")
    }
  }, [mouseMove, onStop, scaleX, scaleY]);

  const handleMouseDown = (e: any) => {
    e.preventDefault();
    document.addEventListener('mousemove', mouseMove);
    resizing.current = true;
    console.log("START RESIZE")
  }

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseUp])

  // let newChildren: any;
  // if (React.isValidElement(children))
  //   newChildren = React.cloneElement(children, { style: { display: 'block', height: '100%' } })



  // return <div ref={ref} className={styles.Resizable} {...rest} style={{ ...rest.style, ...{ width: 100, height: height } }} >
  //   <div data-dir='up' className={`${styles.Edge} ${styles.topEdge}`} onMouseDown={handleMouseDown}></div>
  //   <div data-dir='right' className={`${styles.Edge} ${styles.rightEdge}`} onMouseDown={handleMouseDown}></div>
  //   <div data-dir='down' className={`${styles.Edge} ${styles.bottomEdge}`} onMouseDown={handleMouseDown}></div>
  //   <div data-dir='left' className={`${styles.Edge} ${styles.leftEdge}`} onMouseDown={handleMouseDown}></div>

  //   {newChildren}
  // </div >

  let newElement: any;
  if (React.isValidElement(children)) {
    rest.className += ` ${children.props.className || ''} ${styles.Resizable || ''}`



    newElement = React.cloneElement(children, {
      ...rest,
      style: {
        ...rest?.style,
        ...children.props.style,
        ...{ transform: `${rest?.style?.transform || ''} ${children.props.style?.tranform || ''} scale(${scaleX}, ${scaleY})` },
      },
    })
  }

  console.log(nodeRef)

  return newElement
};

export default Resizable;
