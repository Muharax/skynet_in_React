import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Line, Rect, Text } from 'react-konva';

const GRID_SIZE = 10;
const TILE_WIDTH = 64;  // szerokość kafelka
const TILE_HEIGHT = TILE_WIDTH / 2;  // wysokość kafelka

function Tile({ gridX, gridY, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  const isoX = (gridX - gridY) * TILE_WIDTH / 2;
  const isoY = (gridX + gridY) * TILE_HEIGHT / 2;

  const points = [
    isoX, isoY,
    isoX + TILE_WIDTH / 2, isoY + TILE_HEIGHT / 2,
    isoX, isoY + TILE_HEIGHT,
    isoX - TILE_WIDTH / 2, isoY + TILE_HEIGHT / 2,
  ];

  const handleClick = (e) => {
    e.cancelBubble = true;
    onClick(isoX, isoY);
  }

  return (
    <Line
      points={points}
      fill={isHovered ? '#f00' : ((gridX + gridY) % 2 === 0 ? '#ccc' : '#999')}
      closed
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    />
  );
}

function MenuButton({ x, y, text, onClick }) {
  const handleClick = (e) => {
    e.cancelBubble = true;
    onClick();
  }

  return (
    <Rect
      x={x}
      y={y}
      width={TILE_WIDTH}
      height={TILE_HEIGHT / 2}
      fill="#ddd"
      stroke="#000"
      strokeWidth={1}
      onClick={handleClick}
    />
  );
}

function Menu({ x, y }) {
  return (
    <>
      <MenuButton x={x} y={y} value="Buduj" text="Button 1" onClick={() => console.log("Button 1 clicked")} />
      <MenuButton x={x} y={y + TILE_HEIGHT / 2} text="Button 2" onClick={() => console.log("Button 2 clicked")} />
    </>
  );
}

function CanvasComponent() {
  const stageRef = useRef();
  const layerRef = useRef();
  const containerRef = useRef();
  const [menuPos, setMenuPos] = useState(null);

  useEffect(() => {
    const container = containerRef.current;
    const stage = stageRef.current;
    stage.width(container.offsetWidth);
    stage.height(container.offsetHeight);

    // Wyśrodkowanie warstwy po załadowaniu
    const layer = layerRef.current;
    const x = (container.offsetWidth - layer.width()) / 2;
    const y = (container.offsetHeight - layer.height()) / 2;
    layer.position({ x, y });
  }, []);

  const handleTileClick = (x, y) => {
    setMenuPos({ x, y });
  }

  const tiles = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    for (let j = 0; j < GRID_SIZE; j++) {
      tiles.push(<Tile gridX={i} gridY={j} key={`${i}-${j}`} onClick={handleTileClick} />);
    }
  }

  return (
    <div ref={containerRef} style={{ width: '80vw', height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: 'auto', backgroundColor: 'white' }}>
      <Stage ref={stageRef} onClick={() => setMenuPos(null)}>
        <Layer 
          ref={layerRef}
          draggable
        >
          {tiles}
          {menuPos && <Menu x={menuPos.x} y={menuPos.y} />}
        </Layer>
      </Stage>
    </div>
  );
}

export default CanvasComponent;
