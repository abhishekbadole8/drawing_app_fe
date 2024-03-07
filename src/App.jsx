
import React, { useEffect, useRef, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import "./App.css";
import Remote from './components/Remote';

const App = () => {
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#000000');
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [text, setText] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const textInputRef = useRef(null);

  // mouse clicked
  const handleMouseDown = (e) => {
    const pos = e.target.getStage().getPointerPosition();
    setIsDrawing(true);
    if (tool === 'text') {
      setText('');
      const x = pos.x < 50 ? 50 : pos.x;
      const y = pos.y < 50 ? 50 : pos.y;
      textInputRef.current.style.display = 'block';
      textInputRef.current.style.left = `${x}px`;
      textInputRef.current.style.top = `${y}px`;
      textInputRef.current.focus();
    } else {
      setLines([...lines, { tool, color, points: [pos.x, pos.y] }]);
    }
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
    saveToHistory()
  };

  // handling remote icon click
  const handleClick = (selectedTool) => {
    setTool(selectedTool)
  }

  const handleTextBlur = () => {
    textInputRef.current.style.display = 'none';
    setLines([...lines, { tool: 'text', color, text, position: [textInputRef.current.style.left, textInputRef.current.style.top] }]);
  };

  useEffect(() => {
    saveToHistory();
  }, []);

  const saveToHistory = () => {
    setHistory([...history.slice(0, historyIndex + 1), lines]);
    setHistoryIndex(historyIndex + 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setLines(history[historyIndex - 1]);
      setHistoryIndex(historyIndex - 1);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setLines(history[historyIndex + 1]);
      setHistoryIndex(historyIndex + 1);
    }
  };
  
  return (
    <div className="container">

      <Remote handleClick={handleClick} color={color} setColor={setColor}
        setLines={setLines} handleUndo={handleUndo} handleRedo={handleRedo} />

      <div className="canvas-container">
        <Stage
          width={window.innerWidth - 120}
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <Layer>
            {lines.map((line, i) => {
              if (line.tool === 'text') {
                return (
                  <Text key={i} text={line.text} x={parseInt(line.position[0])} y={parseInt(line.position[1])} fill={line.color} />
                );
              } else {
                return (
                  <Line
                    key={i}
                    points={line.points}
                    stroke={line.color}
                    strokeWidth={line.tool === 'eraser' ? 10 : 5}
                    tension={0.5}
                    lineCap="round"
                    globalCompositeOperation={line.tool === 'eraser' ? 'destination-out' : 'source-over'}
                  />
                );
              }
            })}

          </Layer>
        </Stage>

      </div>
    </div>
  );
};

export default App;
