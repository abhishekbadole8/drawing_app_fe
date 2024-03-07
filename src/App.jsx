
import React, { useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import "./App.css";
import Remote from './components/Remote';

const App = () => {
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#000000');
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  // mouse clicked
  const handleMouseDown = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    console.log(pos);
    setIsDrawing(true);
    setLines([...lines, { tool, color, points: [pos.x, pos.y] }]);
  };

  // mouse clicked and drag
  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const pos = e.target.getStage().getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([pos.x, pos.y]);
    setLines([...lines.slice(0, lines.length - 1), lastLine]);
  };

  // on mouse button remove
  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  // handling remote icon click
  const handleClick = (selectedTool) => {
    setTool(selectedTool)
  }

  return (
    <div className="container">

      <Remote handleClick={handleClick} color={color} setColor={setColor} />

      <div className="canvas-container">
        <Stage
          width={window.innerWidth - 120}
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke={line.color}
                strokeWidth={line.tool === 'eraser' ? 10 : 5}
                tension={0.5}
                lineCap="round"
                globalCompositeOperation={
                  line.tool === 'eraser' ? 'destination-out' : 'source-over'
                }
              />
            ))}

          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default App;
