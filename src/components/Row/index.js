import React from "react";
import "./style.css";

function Row(props) {
    return (
        <div className="output-row">
            <p className="output-item">{props.step}</p>
            <p className="output-item">{props.roombaLocation}</p>
            <p className="output-item">{props.action}</p>
            <p className="output-item">{props.dirt}</p>
            <p className="output-item">{props.wallsHit}</p>
        </div>
    );
}

export default Row;