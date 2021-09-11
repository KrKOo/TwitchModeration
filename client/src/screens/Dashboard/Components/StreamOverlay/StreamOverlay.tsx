import React, { useCallback, useEffect } from 'react';
import styles from './StreamOverlay.module.scss';
import { SocketContext } from 'modules/context/socketContext'
import thumbnail from 'assets/images/thumbnail.png'

import OverlayItem from 'screens/Dashboard/Components/OverlayItem/OverlayItem'
import { useNoRenderRef } from 'modules/hooks';

interface Item {
  id: number;
  position: {
    x: number,
    y: number
  },
  rotation: number;
  size: {
    width: number,
    height: number
  };
  ref: React.RefObject<HTMLDivElement>;
}

function StreamOverlay() {
  const initialState = [
    // {
    //   id: 0, position: { x: 0, y: 0 }, size: { width: 100, height: 100 }, ref: React.useRef<HTMLDivElement>(null)
    // },
    // {
    //   id: 1, position: { x: 100, y: 0 }, size: { width: 100, height: 100 }, ref: React.useRef<HTMLDivElement>(null)
    // },
    {
      id: 2, position: { x: 0, y: 0 }, rotation: 0, size: { width: 100, height: 100 }, ref: React.useRef<HTMLDivElement>(null)
    }]

  const [items, setItems] = React.useState<Item[]>(initialState);
  const itemsNoRenderRef = useNoRenderRef(items);

  const streamResolution = { width: 1920, height: 1080 };

  const socket = React.useContext(SocketContext);

  const overlayRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    socket.on("componentTransform", data => {
      const index = itemsNoRenderRef.current.findIndex((item: Item) => item.id === data.id);
      if (index !== -1) {
        setItems(prevItems => {
          if (data.rotation)
            prevItems[index].rotation = data.rotation;

          if (data.position)
            prevItems[index].position = data.position;

          return [...prevItems]
        });
      }
    })
  }, [socket, itemsNoRenderRef]);

  const onItemDrag = (id: number, position: { x: number, y: number }) => {
    socket.emit("componentTransform", { id: id, position: position });
  }

  const onItemDragStop = (id: number, position: { x: number, y: number }) => {
    const index = itemsNoRenderRef.current.findIndex((item: Item) => item.id === id);
    if (index !== -1) {
      setItems(prevItems => {
        prevItems[index].position = position;
        return [...prevItems]
      });
    }
  }

  const onItemRotate = useCallback((id: number, deg: number) => {
    socket.emit("componentTransform", { id: id, rotation: deg });
  }, [socket])

  const onItemRotateStop = useCallback((id: number, deg: number) => {
    const index = itemsNoRenderRef.current.findIndex((item: Item) => item.id === id);
    if (index !== -1) {
      setItems(prevItems => {
        prevItems[index].rotation = deg;
        return [...prevItems]
      });
    }
  }, [itemsNoRenderRef])

  return (
    <div className={styles.StreamOverlay} ref={overlayRef}>
      {items.map((item) =>
        <OverlayItem
          key={item.id}
          id={item.id}
          position={item.position}
          rotation={item.rotation}
          relativeSize={item.size}
          containerResolution={streamResolution}
          containerRef={overlayRef}
          onDrag={onItemDrag}
          onDragStop={onItemDragStop}
          onRotate={onItemRotate}
          onRotateStop={onItemRotateStop}
          ref={item.ref}
        />
      )}

      <img id={styles.thumbnail} src={thumbnail} alt='thumbnail' />
    </div >
  );
}

export default StreamOverlay;
