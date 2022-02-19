import React, { useCallback, useEffect, useState } from 'react';
import { useWindowSize, useNoRenderRef } from 'modules/hooks'
import FreeTransform from 'react-free-transform'
import './OverlayItem.scss'

export interface OverlayItemProps {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  angle: number;
  offsetX: number;
  offsetY: number;
  onUpdate?: (id: number, payload: any) => void;
}

const OverlayItem = (props: OverlayItemProps) => {
  return <FreeTransform
    {...props}
    onUpdate={(payload: any) => { if (props.onUpdate) props.onUpdate(props.id, payload) }}
  >
    <div style={{ background: 'red', width: '100%', height: '100%' }}></div>
  </FreeTransform >
}

export default OverlayItem;
