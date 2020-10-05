import React from "react";
import "./style.css";

function Table(props) {
    return (
        <div className="table">
            <div className="table-row">
                <p className="table-label">Step</p>
                <p className="table-label">Roomba Location</p>
                <p className="table-label">Action</p>
                <p className="table-label">Total Dirt Collected</p>
                <p className="table-label">Total Walls Hit</p>
            </div>
            {props.children}
        </div>
    );
}

export default Table;