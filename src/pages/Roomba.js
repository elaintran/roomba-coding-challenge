import React, { Component } from "react";
import roomba from "../roomba.json";

class Roomba extends Component {
    state = {
        roomDimensions: roomba[0].roomDimensions,
        roombaLocation: roomba[0].initialRoombaLocation,
        dirtLocation: roomba[0].dirtLocations,
        drivingInstructions: roomba[0].drivingInstructions,
        currentLocation: [],
        output: [
            {
                roombaLocation: [],
                action: [],
                dirtCollected: 0,
                wallsHit: 0
            }
        ]
    }

    componentDidMount() {
        this.getDimensions();
    }

    getDimensions = () => {
        let startLocation = this.state.roombaLocation;
        let currentLocation = this.state.roombaLocation;
        let drivingInstructions = this.state.drivingInstructions;
        //gets roomba location based on action
        const roombaMovement = roomba[0].drivingInstructions.map(instruct => {
            currentLocation = this.getDirections(currentLocation, instruct);
            return currentLocation;
        });
        //add initial location to the beginning of the array
        roombaMovement.unshift(startLocation);
        drivingInstructions.unshift("");
        console.log(roombaMovement);
    }

    getDirections = (location, direction) => {
        // let location = this.state.roombaLocation;
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
            case "W":
                newLocation = location[1] - 1;
                coordinates = [location[0], newLocation];
                break;
            default:
                coordinates = location;
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