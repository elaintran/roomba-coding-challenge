import React from "react";
import "./style.css";

function Card(props) {
    return (
        <div className="card">
            <div className="card-info">
                <p>{props.title}</p>
                <h2>{props.output}</h2>
            </div>
        </div>
    );
}

export default Card;