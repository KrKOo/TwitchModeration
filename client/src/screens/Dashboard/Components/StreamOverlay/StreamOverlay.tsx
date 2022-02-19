import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './StreamOverlay.module.scss';
import { SocketContext } from 'modules/context/socketContext'
import thumbnail from 'assets/images/thumbnail.png'

import OverlayItem, { OverlayItemProps } from 'screens/Dashboard/Components/OverlayItem/OverlayItem'
import { useNoRenderRef, useWindowSize } from 'modules/hooks';


interface RelativeOverlayItem extends OverlayItemProps {
  relativeWidth: number;
  relativeHeight: number;
  relativeX: number;
  relativeY: number;
}

const StreamOverlay = () => {
  const initialState = [
    // {
    //   id: 0, position: { x: 0, y: 0 }, size: { width: 100, height: 100 }, ref: React.useRef<HTMLDivElement>(null)
    // },
    // {
    //   id: 1, position: { x: 100, y: 0 }, size: { width: 100, height: 100 }, ref: React.useRef<HTMLDivElement>(null)
    // },
    {
      id: 2,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      relativeWidth: 100,
      relativeHeight: 100,
      relativeX: 100,
      relativeY: 100,
      scaleX: 1,
      scaleY: 1,
      angle: 0,
      offsetX: 0,
      offsetY: 200
    }]

  // Array of items
  const [items, setItems] = useState<RelativeOverlayItem[]>(initialState);

  // Scale coeficient
  const [scale, setScale] = useState({ x: 1, y: 1 })

  const windowSize = useWindowSize();
  const itemsNoRenderRef = useNoRenderRef(items);
  const streamResolution = useNoRenderRef({ width: 1920, height: 1080 });

  const socket = React.useContext(SocketContext);

  const overlayRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    socket.on("componentTransform", data => {
      const index = itemsNoRenderRef.current.findIndex((item: RelativeOverlayItem) => item.id === data.id);
      if (index !== -1) {
        setItems(prevItems => {
          if (data.rotation)
            prevItems[index].angle = data.angle;

          if (data.position)
            prevItems[index].angle = data.angle;

          return [...prevItems]
        });
      }
    })
  }, [socket, itemsNoRenderRef]);

  // const onItemDrag = (id: number, position: { x: number, y: number }) => {
  //   socket.emit("componentTransform", { id: id, position: position });
  // }

  // const onItemDragStop = (id: number, position: { x: number, y: number }) => {
  //   const index = itemsNoRenderRef.current.findIndex((item: OverlayItemProps) => item.id === id);
  //   if (index !== -1) {
  //     setItems(prevItems => {
  //       prevItems[index].x = position.x;
  //       prevItems[index].x = position.x;
  //       return [...prevItems]
  //     });
  //   }
  // }

  // const onItemRotate = useCallback((id: number, deg: number) => {
  //   socket.emit("componentTransform", { id: id, rotation: deg });
  // }, [socket])

  // Recalculate the scaling on window resize
  useEffect(() => {
    setScale({
      x: streamResolution.current.width / (overlayRef.current?.clientWidth || streamResolution.current.width),
      y: streamResolution.current.height / (overlayRef.current?.clientHeight || streamResolution.current.height)
    })
  }, [streamResolution, windowSize])

  // Recalculate the size and position of all elements
  useEffect(() => {
    setItems((prevItems) => {
      const newItems = prevItems.map((item) => {
        item.width = item.relativeWidth / (item.scaleX * scale.x);
        item.height = item.relativeHeight / (item.scaleY * scale.y);
        item.x = item.relativeX / scale.x;
        item.y = item.relativeY / scale.y;
        return item;
      })
      return newItems;
    })
  }, [scale])

  // Caluclate the relative transformations of an item
  const getRelativeTransofmation = (item: RelativeOverlayItem) => {
    return ({
      relativeWidth: item.width * item.scaleX * scale.x,
      relativeHeight: item.height * item.scaleY * scale.y,
      relativeX: item.x * scale.x,
      relativeY: item.y * scale.y,
    })
  }

  // Called when the item is transformed
  const handleItemUpdate = (id: number, payload: any) => {
    payload.x && (payload.relativeX = payload.x * scale.x);
    payload.y && (payload.relativeY = payload.y * scale.y);

    setItems((prevItems) => {
      const itemID = prevItems.findIndex(item => item.id = id)
      if (itemID !== -1) {
        let newItems = prevItems.slice();
        // Merge payload and the relative transformations to the new item
        newItems[itemID] = { ...newItems[itemID], ...payload, ...getRelativeTransofmation(newItems[itemID]) }
        return newItems;
      }
      return prevItems;
    })
  }

  return (
    <div className={styles.StreamOverlay} ref={overlayRef}>
      {items.map((item) => {
        return <OverlayItem
          key={item.id}
          onUpdate={handleItemUpdate}
          {...item}
        />
      })}

      <img id={styles.thumbnail} src={thumbnail} alt='thumbnail' />
    </div >
  );
}

export default StreamOverlay;
