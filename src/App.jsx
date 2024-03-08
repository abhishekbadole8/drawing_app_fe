
import React, { useEffect, useRef, useState } from 'react';
import { Stage, Arrow, Layer, Line, Circle, Rect, Transformer } from 'react-konva';
import "./App.css";
import Remote from './components/Remote';
import { ACTIONS } from "./constants/constants";
import { v4 as uuidv4 } from 'uuid';
import { getShape, postShape } from './services/shapeApi';
import { assign } from 'lodash';

const App = () => {
  const stageRef = useRef();

  const [action, setAction] = useState(ACTIONS.SELECT); // action
  const [rectangles, setRectangles] = useState([]); // rectagle
  const [circles, setCircles] = useState([]); // circle
  const [arrows, setArrows] = useState([]); // arrow
  const [lines, setLines] = useState([]); // straight line
  const [scribbles, setScribbles] = useState([]); // pen
  const [checkMouseUp, setCheckMouseUp] = useState(false)

  const [strokeColor, setStrokeColor] = useState("#000"); // for stroke color - default #000(black)
  const [strokeSize, setStrokeSize] = useState(2) // for stroke size

  const isPaining = useRef();
  const currentShapeId = useRef();
  const transformerRef = useRef();

  const isDraggable = action === ACTIONS.SELECT;


  // mouse clicked
  const handleMouseDown = () => {
    if (action === ACTIONS.SELECT) return;

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    const id = uuidv4();

    currentShapeId.current = id;
    isPaining.current = true;

    switch (action) {
      case ACTIONS.RECTANGLE:
        setRectangles((rectangles) => [
          ...rectangles, {
            id, x, y, height: 10, width: 10, strokeColor, strokeWidth: strokeSize
          },
        ]);
        break;
      case ACTIONS.LINE:
        setLines((line) => [
          ...line, { id, points: [x, y, x, y], strokeColor, strokeWidth: strokeSize },
        ]);
        break;
      case ACTIONS.CIRCLE:
        setCircles((circles) => [
          ...circles, {
            id, x, y, radius: 5, strokeColor, strokeWidth: strokeSize
          }]);
        break;
      case ACTIONS.ARROW:
        setArrows((arrows) => [
          ...arrows, { id, points: [x, y, x + 10, y + 10], strokeColor, strokeWidth: strokeSize },
        ]);
        break;
      case ACTIONS.SCRIBBLE:
        setScribbles((scribbles) => [
          ...scribbles, { id, points: [x, y], strokeColor, strokeWidth: strokeSize }
        ])
        break
    }
  };

  // mouse clicked and drag
  const handleMouseMove = () => {
    if (action === ACTIONS.SELECT || !isPaining.current) return;

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();

    switch (action) {
      case ACTIONS.LINE:
        setLines((lines) =>
          lines.map((line) => {
            if (line.id === currentShapeId.current) {
              return {
                ...line, points: [line.points[0], line.points[1], x, y],
              };
            }
            return line;
          })
        );

        break;
      case ACTIONS.RECTANGLE:
        setRectangles((rectangles) =>
          rectangles.map((rectangle) => {
            if (rectangle.id === currentShapeId.current) {
              return {
                ...rectangle, width: x - rectangle.x, height: y - rectangle.y,
              };
            }
            return rectangle;
          })
        );
        break;
      case ACTIONS.CIRCLE:
        setCircles((circles) =>
          circles.map((circle) => {
            console.log(circle)
            if (circle.id === currentShapeId.current) {
              return {
                ...circle,
                radius: ((y - circle.y) ** 2 + (x - circle.x) ** 2) ** 0.5,
              };
            }
            return circle;
          })
        );
        break;
      case ACTIONS.ARROW:
        setArrows((arrows) =>
          arrows.map((arrow) => {
            if (arrow.id === currentShapeId.current) {
              return {
                ...arrow, points: [arrow.points[0], arrow.points[1], x, y],
              };
            }
            return arrow;
          })
        );
        break;
      case ACTIONS.SCRIBBLE:
        setScribbles((scribbles) =>
          scribbles.map((scribble) => {
            if (scribble.id === currentShapeId.current) {
              return { ...scribble, points: [...scribble.points, x, y] }
            }
            return scribble;
          })
        )
        break
    }
  };

  // on mouse button remove
  const handleMouseUp = async () => {
    isPaining.current = false;
    setCheckMouseUp(true)

  };

  // handling remote icon click
  const handleClick = (selectedAction) => {
    setAction(selectedAction)
  }

  function onClick(e) {
    if (action !== ACTIONS.SELECT) return;
    const target = e.currentTarget;
    transformerRef.current.nodes([target]);
  }
  
  useEffect(() => {
    const getShapeData = async () => {
      try {
        const items = await getShape()
        items.map((item) => {
          if (item.type == 'RECTANGLE') {
            setRectangles([...item.data])
          }
          if (item.type == 'CIRCLE') {
            setCircles([...item.data])
          }
          if (item.type == 'LINE') {
            setLines([...item.data])
          }
          if (item.type == 'ARROW') {
            setArrows([...item.data])
          }
          if (item.type == 'SCRIBBLE') {
            setScribbles([...item.data])
          }
        })
      } catch (error) {
        console.log(error);
      }
    }
    getShapeData()
  }, [])

  useEffect(() => {
    const handleUpdate = async () => {
      switch (action) {
        case ACTIONS.RECTANGLE:
          await postShape({ type: action, data: rectangles })
          break;
        case ACTIONS.CIRCLE:
          await postShape({ type: action, data: circles })
          break;
        case ACTIONS.LINE:
          await postShape({ type: action, data: lines })
          break;
        case ACTIONS.ARROW:
          await postShape({ type: action, data: arrows })
          break;
        case ACTIONS.SCRIBBLE:
          await postShape({ type: action, data: scribbles })
          break;
      }
    }
    handleUpdate()
    setCheckMouseUp(false)
  }, [checkMouseUp])

  return (
    <div className="container">

      <Remote action={action} handleClick={handleClick}
        setStrokeSize={setStrokeSize} setStrokeColor={setStrokeColor} />

      <div className="canvas-container">
        <Stage
          ref={stageRef}
          width={window.innerWidth - 120}
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <Layer>
            <Rect
              x={0}
              y={0}
              height={window.innerHeight}
              width={window.innerWidth}
              fill="#ffffff"
              id="bg"
              onClick={() => {
                transformerRef.current.nodes([]);
              }}
            />

            {rectangles.map((rectangle) => (
              <Rect
                key={rectangle.id}
                x={rectangle.x}
                y={rectangle.y}
                stroke={rectangle.strokeColor}
                strokeWidth={rectangle.strokeWidth}
                fill='transparent'
                height={rectangle.height}
                width={rectangle.width}
                draggable={isDraggable}
                onClick={onClick}
              />
            ))}

            {circles.map((circle) => (
              <Circle
                key={circle.id}
                radius={circle.radius}
                x={circle.x}
                y={circle.y}
                stroke={circle.strokeColor}
                strokeWidth={circle.strokeWidth}
                fill='transparent'
                draggable={isDraggable}
                onClick={onClick}
              />
            ))}

            {arrows.map((arrow) => (
              <Arrow
                key={arrow.id}
                points={arrow.points}
                stroke={arrow.strokeColor}
                strokeWidth={arrow.strokeWidth}
                fill={arrow.fillColor}
                draggable={isDraggable}
                onClick={onClick}
              />
            ))}

            {scribbles.map((scribble) => (
              <Line
                key={scribble.id}
                lineCap="round"
                lineJoin="round"
                points={scribble.points}
                stroke={scribble.strokeColor}
                strokeWidth={scribble.strokeWidth}
                fill={scribble.fillColor}
                draggable={isDraggable}
                onClick={onClick}
              />
            ))}

            {lines.map((line) => (
              <Line
                key={line.id}
                points={line.points}
                stroke={line.strokeColor}
                strokeWidth={line.strokeWidth}
                draggable={isDraggable}
                onClick={onClick}
              />
            ))}


            <Transformer ref={transformerRef} />
          </Layer>
        </Stage>

      </div>
    </div>
  );
};

export default App;
