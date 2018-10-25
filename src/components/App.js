import React, { Component } from 'react';
import findRoutes from '../routing/findRoutes';
import './App.css';
import { Col, Button, Grid, FormControl, FormGroup } from 'react-bootstrap';
import getNearestMrt from 'nearest-mrt'
import MRT_JSON from './../routing/mrt.json';
// This is only a placeholder to demonstrate the Google Maps API.
// You should reorganize and improve it.
import MRT_DATA from './../routing/mrt.json';

const ORIGIN_KEY = 'origin';
const DESTINATION_KEY = 'destination';


class App extends Component {

    state = {
       places: null
    }

    componentDidMount() {
        this.getLocation(ORIGIN_KEY);
        this.getLocation(DESTINATION_KEY);
    }

    getLocation = (id) => {
        setTimeout(() => {
            const { SearchBox } = window.google.maps.places;
            const originSearch = new SearchBox(document.getElementById(id));
            originSearch.addListener('places_changed', () => {
                const _places = originSearch.getPlaces();
                const location = _places[0].geometry.location.toJSON();
                const places = this.state.places;
                if(id == ORIGIN_KEY) {
                    this.setState({
                        places: {
                            ...places,
                            origin: location
                        }
                    },() => {console.log(this.state)});
                } else if(id == DESTINATION_KEY) {
                    this.setState({
                        places: {
                            ...places,
                            destination: location
                        }
                    },() => {console.log(this.state)});
                }
                
            });
        }, 100);
    }

    findMRTRoutes = () => {
        console.log(this.state.places.origin.lat);
        // let nearestMRTOrigin = getNearestMrt([this.state.places.origin.lng, this.state.places.origin.lat]);
        // let nearestMRTDestination= getNearestMrt([this.state.places.destination.lng, this.state.places.destination.lat]);
        // let originLocation = {
        //     lines: Object.keys(nearestMRTOrigin.result[0].station.line).filter(key => {
        //         return nearestMRTOrigin.result[0].station.line[key]
        //     })
        // }
        // let destinationLocation = {
        //     lines: Object.keys(nearestMRTDestination.result[0].station.line).filter(key => {
        //         return nearestMRTDestination.result[0].station.line[key]
        //     })
        // }
        
        console.log(MRT_DATA);
    }

    render() {
        return (
            <div id='app' className="container">
                <Grid>
                    <h3>MRT Routes Finder</h3>
                    <form>
                        <FormGroup>
                            <FormControl
                                type="text"
                                id="origin"
                                placeholder="Origin"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormControl
                                type="text"
                                id="destination"
                                placeholder="Destination"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Col>
                                <Button style={{ float: 'right' }} 
                                    onClick={this.findMRTRoutes}
                                    >Search</Button>
                            </Col>
                        </FormGroup>
                    </form>

                    <h3 style={{clear: 'both'}}>Suggested routes</h3>
                </Grid>

                <div id='results' />
            </div >
        )
    }
}

export default App;
