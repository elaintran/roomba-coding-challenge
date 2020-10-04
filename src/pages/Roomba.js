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
                dirtCollected: [],
                wallsHit: []
            }
        ]
    }

    componentDidMount() {
        this.getOutput();
    }

    getOutput = () => {
        let startLocation = this.state.roombaLocation;
        let currentLocation = this.state.roombaLocation;
        let drivingInstructions = this.state.drivingInstructions;
        let dirtCollected = 0;
        let dirtArr = [];
        let filteredCoords = [];
        //gets roomba location based on action
        const roombaMovement = roomba[0].drivingInstructions.map(instruct => {
            currentLocation = this.getDirections(currentLocation, instruct);
            return currentLocation;
        });
        //add initial location to the beginning of the array
        roombaMovement.unshift(startLocation);

        filteredCoords = roombaMovement.filter((coordinates, index) => roombaMovement.indexOf(coordinates) === index);
        dirtArr = filteredCoords.map(location => {
            this.state.dirtLocation.map(dirt => {
                //convert to string to compare array
                if (JSON.stringify(location) === JSON.stringify(dirt)) {
                    dirtCollected++;
                }
            });
            return dirtCollected;
        });
        // console.log(this.state.dirtLocation);
        console.log(dirtArr);
        drivingInstructions.unshift("");
        this.setState({
            output: [
                {
                    roombaLocation: roombaMovement,
                    action: drivingInstructions,
                    dirtCollected: dirtArr,
                    wallsHit: 0
                }
            ]
        });
    }

    getDirections = (location, direction) => {
        let newLocation;
        let coordinates;
        let roomDimensions = this.state.roomDimensions;
        switch(direction) {
            //north
            case "N":
                newLocation = location[1]++;
                coordinates = [location[0], newLocation];
                break;
            //east
            case "E":
                newLocation = location[0]++;
                coordinates = [newLocation, location[1]];
                break;
            //south
            case "S":
                newLocation = location[1]--;
                coordinates = [location[0], newLocation];
                break;
            //west
            case "W":
                newLocation = location[0]--;
                coordinates = [newLocation, location[1]];
                break;
            default:
                coordinates = location;
        }
        //check if roomba collided and prevent it from moving
        if (coordinates[0] > roomDimensions[0] || coordinates[0] < 0 || coordinates[1] > roomDimensions[1] || coordinates[1] < 0) {
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