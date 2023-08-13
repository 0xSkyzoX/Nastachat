import React from 'react'

export type PositionInfo = {
    x: number,
    y: number
}

interface ContextMenuComponentProps {
    position: PositionInfo
}

const ContextMenu: React.FC<ContextMenuComponentProps> = ({position: {x, y}}) => {
  return (
    <div></div>
  )
}

export default ContextMenu