import React, { ReactNode, useEffect, useRef, useState } from 'react'
import styles from './Rotatable.module.scss'

export interface RotatableEvent {
  deg: number
}

export interface RotatableProps {
  children?: ReactNode;
  rotation?: number
  onRotate?: (e: RotatableEvent) => void;
  onStop?: (e: RotatableEvent) => void;
  [rest: string]: any;
};

const Rotatable = React.forwardRef((props: RotatableProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  const { children, rotation: rotationProp, onRotate, onStop, ...rest } = props;

  const [rotation, setRotation] = useState(rotationProp || 0);
  const mousePos = { x: undefined, y: undefined }

  const latestRotation = useRef(rotation);
  let rotating = false;

  document.addEventListener('mouseup', (e) => {
    if (rotating) {
      onStop && onStop({ deg: latestRotation.current })
      document.removeEventListener('mousemove', mouseMove);
      rotating = false
    }
  })

  useEffect(() => {
    if (rotationProp)
      setRotation(rotationProp as number);
  }, [rotationProp]);

  const mouseMove = (e: any) => {
    let deg: number;
    if (mousePos.x !== undefined && mousePos.y !== undefined) {
      setRotation((prevRotation) => {
        deg = (prevRotation + (e.clientX - mousePos.x!)) % 360;
        if (deg < 0) deg += 360

        if (deg !== prevRotation)
          onRotate && onRotate({ deg: deg })
        return deg;
      })
    }

    mousePos.x = e.clientX
    mousePos.y = e.clientY
  }

  const handleMouseDown = (e: any) => {
    e.preventDefault();
    document.addEventListener('mousemove', mouseMove);
    rotating = true;
  }

  rest.className += ` ${styles.Rotatable}`

  return <div ref={ref} {...rest} style={{ ...rest.style, ...{ position: 'absolute', transform: rest.style.transform + `rotate(${rotation}deg)` } }} >
    <div className={styles.Handle} onMouseDown={handleMouseDown} ></div>

    {props.children}
  </div >
});

export default Rotatable;
