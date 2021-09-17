import React, { useCallback } from 'react';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import Rotatable, { RotatableEvent } from 'components/Rotatable/Rotatable'
import { useWindowSize, useNoRenderRef } from 'modules/hooks'
import { Size, Position } from 'modules/types'
import Resizable from 'components/Resizable/Resizable';

interface ItemProps {
  id: number;
  position: {
    x: number,
    y: number
  };
  relativeSize: {
    width: number,
    height: number
  };
  rotation: number;
  containerResolution: { width: number, height: number };
  containerRef: React.RefObject<HTMLDivElement>;
  onDrag?: (id: number, position: { x: number, y: number }) => void;
  onDragStop?: (id: number, position: { x: number, y: number }) => void;
  onRotate?: (id: number, deg: number) => void;
  onRotateStop?: (id: number, deg: number) => void;
}

const StreamOverlay = React.forwardRef<HTMLDivElement, ItemProps>((props: ItemProps, ref) => {
  const { onDrag: onDragProp, onDragStop: onDragStopProp, onRotate: onRotateProp, onRotateStop: onRotateStopProp } = props;

  const [size, setSize] = React.useState<Size>({ width: 0, height: 0 });
  const [position, setPosition] = React.useState<Position>({ x: 0, y: 0 });
  const [containerSize, setContainerSize] = React.useState({ ...props.containerResolution });

  const sizeNoRenderRef = useNoRenderRef(size);
  const positionNoRenderRef = useNoRenderRef(position);
  const containerSizeNoRenderRef = useNoRenderRef(containerSize);

  const windowSize = useWindowSize()

  React.useEffect(() => {
    const container = getRefParameters(props.containerRef);
    if (!container.size) return;

    const itemAbsoluteSize = changeResolution(
      { x: sizeNoRenderRef.current.width, y: sizeNoRenderRef.current.height },
      containerSizeNoRenderRef.current,
      container.size
    );
    const itemAbsolutePosition = changeResolution(positionNoRenderRef.current, containerSizeNoRenderRef.current, container.size);

    setContainerSize(prevState => ({ ...prevState, width: container.size.width, height: container.size.height }))
    itemAbsoluteSize && setSize((prevState) => ({ ...prevState, width: itemAbsoluteSize.x, height: itemAbsoluteSize.y }))
    itemAbsolutePosition && setPosition((prevState) => ({ ...prevState, x: itemAbsolutePosition.x, y: itemAbsolutePosition.y }))

  }, [containerSizeNoRenderRef, positionNoRenderRef, props.containerRef, sizeNoRenderRef, windowSize])

  React.useEffect(() => {
    const container = getRefParameters(props.containerRef);
    if (!container.size) return;
    const itemAbsolutePosition = changeResolution(props.position, props.containerResolution, container.size);
    itemAbsolutePosition && setPosition((prevState) => ({ ...prevState, x: itemAbsolutePosition.x, y: itemAbsolutePosition.y }))

  }, [props.containerRef, props.containerResolution, props.position])

  React.useEffect(() => {
    const container = getRefParameters(props.containerRef);
    if (!container.size) return;
    const itemAbsoluteSize = changeResolution({ x: props.relativeSize.width, y: props.relativeSize.height }, props.containerResolution, container.size);
    itemAbsoluteSize && setSize((prevState) => ({ ...prevState, width: itemAbsoluteSize.x, height: itemAbsoluteSize.y }))

  }, [props.containerRef, props.containerResolution, props.relativeSize])

  const changeResolution = (base: Position, sourceRes: Size, targetRes: Size) => {
    return {
      x: base.x * (targetRes.width / sourceRes.width),
      y: base.y * (targetRes.height / sourceRes.height)
    }
  }

  const getRefParameters = (ref: React.RefObject<HTMLDivElement>) => {
    if (!ref) return ({ size: null, position: null });
    if (!ref.current) return ({ size: null, position: null });
    const refRect = ref.current.getBoundingClientRect();

    return ({
      size: {
        width: refRect.width,
        height: refRect.height
      },
      position: {
        x: refRect.x,
        y: refRect.y
      }
    });
  }

  const getRelativeItemPosition = useCallback((absolutePosition: Position) => {
    const container = getRefParameters(props.containerRef);
    if (container.size) {
      return changeResolution(absolutePosition, container.size, props.containerResolution);
    }
  }, [props.containerRef, props.containerResolution])

  const onDrag = useCallback((e: DraggableEvent, d: DraggableData) => {
    setPosition({ x: d.x, y: d.y })

    if (onDragProp) {
      const relativeItemPos = getRelativeItemPosition({ x: d.x, y: d.y });
      relativeItemPos && onDragProp(props.id, relativeItemPos);
    }
  }, [getRelativeItemPosition, onDragProp, props.id])

  const onStop = useCallback((e: DraggableEvent, d: DraggableData) => {
    if (onDragStopProp) {
      const relativeItemPos = getRelativeItemPosition({ x: d.x, y: d.y });
      relativeItemPos && onDragStopProp(props.id, relativeItemPos);
    }
  }, [getRelativeItemPosition, onDragStopProp, props.id])

  const onRotate = useCallback((e: RotatableEvent) => {
    onRotateProp && onRotateProp(props.id, e.deg);
  }, [onRotateProp, props.id]);

  const onRotateStop = useCallback((e: RotatableEvent) => {
    onRotateStopProp && onRotateStopProp(props.id, e.deg)
  }, [onRotateStopProp, props.id]);

  return (
    <Draggable
      bounds='parent'
      nodeRef={ref as React.RefObject<HTMLDivElement>}
      onDrag={onDrag}
      onStop={onStop}
      position={position}>

      <Rotatable nodeRef={ref as React.RefObject<HTMLDivElement>} rotation={props.rotation} onRotate={onRotate} onStop={onRotateStop}>
        <Resizable nodeRef={ref as React.RefObject<HTMLDivElement>}>
          <div ref={ref} style={{ position: 'absolute', background: 'red', width: '100px', height: '100px' }}></div>
        </Resizable>
      </Rotatable>
    </Draggable >
  );
});

export default StreamOverlay;
