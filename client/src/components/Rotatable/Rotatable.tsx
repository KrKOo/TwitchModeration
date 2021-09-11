import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
  const mousePos = useMemo(() => { return ({ x: undefined, y: undefined }) }, [])

  const latestRotation = useRef(rotation);
  let rotating = useRef(false);

  const mouseMove = useCallback((e: any) => {
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
  }, [mousePos, onRotate])

  const handleMouseUp = useCallback((e: any) => {
    if (rotating.current) {
      onStop && onStop({ deg: latestRotation.current })
      document.removeEventListener('mousemove', mouseMove);
      rotating.current = false
      mousePos.x = undefined;
      mousePos.y = undefined;
    }
  }, [mouseMove, mousePos, onStop]);

  const handleMouseDown = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    document.addEventListener('mousemove', mouseMove);
    rotating.current = true;
  }

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp)
    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseUp]);

  useEffect(() => {
    if (rotationProp)
      setRotation(rotationProp as number);
  }, [rotationProp]);

  let newElement: any;
  if (React.isValidElement(children)) {
    rest.className += ` ${children.props.className || ''} ${styles.Rotatable || ''}`

    newElement = React.cloneElement(children, {
      ref: ref,
      ...rest,
      style: {
        ...rest?.style,
        ...children.props.style,
        ...{ transform: `${rest?.style?.transform || ''} ${children.props.style?.tranform || ''} rotate(${rotation}deg)` }
      },
      children: <div className={styles.Handle} onMouseDown={handleMouseDown}></div>

    })
  }

  return newElement
});

export default Rotatable;


