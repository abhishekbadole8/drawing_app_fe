import React from 'react'
import "../App.css";
import { FaPen, FaRegCircle, FaRegSquare, FaEraser, FaMinus, FaLongArrowAltDown, FaUndoAlt, FaRedoAlt } from 'react-icons/fa';
import { CiText } from "react-icons/ci";

function Remote({ handleClick, color, setColor, setLines, handleRedo, handleUndo }) {

    return (
        <aside className="controls">

            <div className="color-picker">
                <input type="color" id="color" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>

            <div className="tool-icons">
                <div className="tool-icon" onClick={() => handleClick('square')}>
                    <FaRegSquare />
                </div>
                <div className="tool-icon" onClick={() => handleClick('circle')}>
                    <FaRegCircle />
                </div>
                <div className="tool-icon" onClick={() => handleClick('triangle')}>
                    <FaLongArrowAltDown />
                </div>
                <div className="tool-icon" onClick={() => handleClick('line')}>
                    <FaMinus />
                </div>
                <div className="tool-icon" onClick={() => handleClick('pen')}>
                    <FaPen />
                </div>
                <div className="tool-icon" onClick={() => handleClick('eraser')}>
                    <FaEraser />
                </div>
                <div className="tool-icon" onClick={() => handleUndo()}>
                    <FaUndoAlt />
                </div>
                <div className="tool-icon" onClick={() => handleRedo()}>
                    <FaRedoAlt />
                </div>
                <div className="tool-icon" onClick={() => handleClick('text')}>
                    <CiText />
                </div>

            </div>

            <button className="clear-button" onClick={() => setLines([])}>
                Clear
            </button>

        </aside>
    )
}

export default Remote;