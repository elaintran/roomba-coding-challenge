import React, { Component } from "react";
import roomba from "../roomba.json";

class Roomba extends Component {
    state = {
        roomDimensions: roomba[0].roomDimensions,
        roombaLocation: roomba[0].initialRoombaLocation,
        dirtLocation: roomba[0].dirtLocations,
        drivingInstructions: roomba[0].drivingInstructions,
        output: []
    }

    componentDidMount() {
        this.getDimensions();
    }

    getDimensions = () => {
        console.log(this.state.roombaLocation);
        const roombaMovement = roomba[0].drivingInstructions.map(instruct => {
            return this.getDirections(instruct);
        });
        console.log(roombaMovement);
    }

    getDirections = direction => {
        let location = this.state.roombaLocation;
        let newLocation;
        let coordinates;
        switch(direction) {
            //north
            case "N": 
                newLocation = location[0] + 1;
                coordinates = [newLocation, location[1]];
                break;
            //east
            case "E":
                newLocation = location[1] + 1;
                coordinates = [location[0], newLocation];
                break;
            //south
            case "S":
                newLocation = location[0] - 1;
                coordinates = [newLocation, location[1]];
                break;
            //west
            default:
                newLocation = location[1] - 1;
                coordinates = [location[0], newLocation];
        }
        return coordinates;
    }

    render() {
        return (
            <div>
                <p></p>
            </div>
        );
    }
}

export default Roomba;