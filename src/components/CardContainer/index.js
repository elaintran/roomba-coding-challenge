import React from "react";
import "./style.css";

function CardContainer(props) {
    return (
        <div className="card-container">
            {props.children}
        </div>
    );
}

export default CardContainer;