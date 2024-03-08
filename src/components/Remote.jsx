import React from 'react'
import "../App.css";
import { FaFont, FaPen, FaRegCircle, FaRegSquare, FaEraser, FaMinus, FaPlus, FaLongArrowAltDown, FaUndoAlt, } from 'react-icons/fa';
import { LuRectangleHorizontal } from "react-icons/lu";
import { BsHandIndex } from "react-icons/bs";
import { IoRemoveOutline } from "react-icons/io5";

import { CiText } from "react-icons/ci";
import { ACTIONS } from "../constants/constants";

function Remote({ action, handleClick, outlineColor,  setStrokeSize,setStrokeColor }) {


    return (
        <aside className="controls">

            <div className="color-picker">
                <input type="color" id="color" value={outlineColor} onChange={(e) => setStrokeColor(e.target.value)} />
            </div>

            <div className="tool-icons">

                <div className={action === ACTIONS.RECTANGLE ? 'tool-icon tool-icon-active' : 'tool-icon'} onClick={() => handleClick('RECTANGLE')}>
                    <LuRectangleHorizontal />
                </div>

                <div className={action === ACTIONS.CIRCLE ? 'tool-icon tool-icon-active' : 'tool-icon'} onClick={() => handleClick('CIRCLE')}>
                    <FaRegCircle />
                </div>

                <div className={action === ACTIONS.LINE ? 'tool-icon tool-icon-active' : 'tool-icon'} onClick={() => handleClick('LINE')}>
                    <IoRemoveOutline />
                </div>

                <div className={action === ACTIONS.ARROW ? 'tool-icon tool-icon-active' : 'tool-icon'} onClick={() => handleClick('ARROW')}>
                    <FaLongArrowAltDown />
                </div>

                <div className={action === ACTIONS.SCRIBBLE ? 'tool-icon tool-icon-active' : 'tool-icon'} onClick={() => handleClick('SCRIBBLE')}>
                    <FaPen />
                </div>

                <div className={action === ACTIONS.ERASER ? 'tool-icon tool-icon-active' : 'tool-icon'} onClick={() => handleClick('ERASER')}>
                    <FaEraser />
                </div>

                <div className={action === ACTIONS.SELECT ? 'tool-icon tool-icon-active' : 'tool-icon'} onClick={() => handleClick('SELECT')}>
                    <BsHandIndex />
                </div>

                <div className='tool-icon' onClick={() => setStrokeSize(prev => (prev === 1 ? 1 : prev - 1))}>
                    <FaMinus />
                </div>

                <div className='tool-icon' onClick={() => setStrokeSize(prev => (prev + 1))}>
                    <FaPlus />
                </div>

            </div>

            <button className="clear-button" onClick={() => setLines([])}>
                Clear
            </button>

        </aside>
    )
}

export default Remote;