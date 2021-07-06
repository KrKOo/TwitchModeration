import React, { Children } from 'react';
import Draggable from 'react-draggable';

function DraggableWithPosition(props: { parentRef: React.RefObject<HTMLDivElement>, children: React.ReactElement, onDrag?: (e: any) => void }) {
  const nodeRef = React.useRef<HTMLDivElement>(null);

  const childWithRef = React.cloneElement(props.children, { ref: nodeRef })

  const onDrag = (e: any) => {
    if (nodeRef.current && props.parentRef.current) {

      const nodeRect = nodeRef.current.getBoundingClientRect();
      const parentRect = props.parentRef.current.getBoundingClientRect();

      const nodePos = {
        x: nodeRect.x - parentRect.x,
        y: nodeRect.y - parentRect.y
      }

      if (props.onDrag)
        props.onDrag(nodePos);
    }
  }

  return (
    <Draggable bounds='parent' nodeRef={nodeRef} onDrag={onDrag}>
      {childWithRef}
    </Draggable>
  );
}

export default DraggableWithPosition;
