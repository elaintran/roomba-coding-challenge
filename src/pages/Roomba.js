import React, { Component } from "react";
import Container from "../components/Container";
import Table from "../components/Table";
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
        let dirtArr;
        let wallsArr;
        let output;
        //gets roomba location based on action
        const roombaMovement = roomba[0].drivingInstructions.map(instruct => {
            currentLocation = this.getDirections(currentLocation, instruct);
            return currentLocation;
        });
        //add initial location to the beginning of the array
        roombaMovement.unshift(startLocation);
        drivingInstructions.unshift("");
        dirtArr = this.getDirt(roombaMovement);
        wallsArr = this.wallsHit(roombaMovement);

        output = roombaMovement.map((roomba, index) => {
            return {
                roombaLocation: roomba,
                action: drivingInstructions[index],
                dirtCollected: dirtArr[index],
                wallsHit: wallsArr[index]
            }
        });

        this.setState({ output: output }, () => console.log(this.state.output));
    }

    getDirections = (location, direction) => {
        let newLocation;
        let coordinates;
        let roomDimensions = this.state.roomDimensions;
        switch(direction) {
            //north
            case "N":
                newLocation = location[1] + 1;
                coordinates = [location[0], newLocation];
                break;
            //east
            case "E":
                newLocation = location[0] + 1;
                coordinates = [newLocation, location[1]];
                break;
            //south
            case "S":
                newLocation = location[1] - 1;
                coordinates = [location[0], newLocation];
                break;
            //west
            case "W":
                newLocation = location[0] - 1;
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

    getDirt = roombaMovement => {
        let filteredCoords = [];
        let dirtCollected = 0;
        let dirtArr = [];
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
        return dirtArr;
    }

    wallsHit = roombaMovement => {
        let wallsArr;
        let wallsHit = 0;
        wallsArr = roombaMovement.map((movement, index) => {
            if (roombaMovement[index] !== 0) {
                if (movement === roombaMovement[index - 1]) {
                    wallsHit++; 
                }
            }
            return wallsHit;
        });
        return wallsArr;
    }

    render() {
        return (
            <Container>
                <Table>
                    {this.state.output.map((output, index) => {
                        return (
                            <div className="table-row">
                                <p className="title">{index + 1}</p>
                                <p className="title">{output.roombaLocation.toString()}</p>
                                <p className="title">{output.action}</p>
                                <p className="title">{output.dirtCollected}</p>
                                <p className="title">{output.wallsHit}</p>
                            </div>
                        );
                    })}
                </Table>
            </Container>
        );
    }
}

export default Roomba;