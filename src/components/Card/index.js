import React from "react";
import "./style.css";

function Card(props) {
    return (
        <div className="card">
            <p>{props.title}</p>
            <h2>{props.output}</h2>
        </div>
    );
}

export default Card;