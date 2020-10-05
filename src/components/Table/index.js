import React from "react";
import "./style.css";

function Table(props) {
    return (
        <div className="table">
            <div className="table-row">
                <p className="title">Step</p>
                <p className="title">Roomba Location</p>
                <p className="title">Action</p>
                <p className="title">Total Dirt Collected</p>
                <p className="title">Total Walls Hit</p>
            </div>
            {props.children}
        </div>
    );
}

export default Table;