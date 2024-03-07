import React from 'react'
import "../App.css";
import { FaPen, FaRegCircle, FaRegSquare, FaEraser, FaMinus, FaLongArrowAltDown } from 'react-icons/fa';

function Remote({ handleClick, color, setColor }) {

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
            </div>

            <button className="clear-button" onClick={() => setLines([])}>
                Clear
            </button>

        </aside>
    )
}

export default Remote;