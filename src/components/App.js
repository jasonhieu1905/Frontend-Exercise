import React, { Component } from 'react';
import findRoutes from '../routing/findRoutes';
import './App.css';
import { Col, Button, Grid, FormControl, FormGroup } from 'react-bootstrap';
import getNearestMrt from 'nearest-mrt'
import MRT_JSON from './../routing/mrt.json';
// This is only a placeholder to demonstrate the Google Maps API.
// You should reorganize and improve it.
import MRT_DATA from './../routing/mrt.json';
import LineInfo from './Line/Line';
import RouteDetail from './RouteDetail/RouteDetail';
const ORIGIN_KEY = 'origin';
const DESTINATION_KEY = 'destination';

class App extends Component {

    state = {
        places: null,
        results: [
            {
                steps: [
                    { type: "walk", from: "origin", to: "botanic_gardens" },
                    { type: "ride", line: "CC", from: "botanic_gardens", to: "buona_vista" },
                    { type: "change", station: "buona_vista", from: "CC", to: "EW" },
                    { type: "ride", line: "EW", from: "buona_vista", to: "bugis" },
                    { type: "walk", from: "bugis", to: "destination" }
                ],
                show: false
            },
            {
                steps: [
                    { type: "walk", from: "origin", to: "botanic_gardens" },
                    { type: "ride", line: "CC", from: "botanic_gardens", to: "buona_vista" },
                    { type: "change", station: "buona_vista", from: "CC", to: "EW" },
                    { type: "ride", line: "EW", from: "buona_vista", to: "bugis" },
                    { type: "walk", from: "bugis", to: "destination" }
                ],
                show: false
            }
        ]
        
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
                if (id == ORIGIN_KEY) {
                    this.setState({
                        places: {
                            ...places,
                            origin: location
                        }
                    }, () => { console.log(this.state) });
                } else if (id == DESTINATION_KEY) {
                    this.setState({
                        places: {
                            ...places,
                            destination: location
                        }
                    }, () => { console.log(this.state) });
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

    getRoutePath = (steps) => {
        let points = [];
        let stepsWithRide = steps.filter(item => item.type == 'ride');
        for (let i = 0; i < stepsWithRide.length; i++) {
            points.push(<LineInfo line={stepsWithRide[i].line} />)
            if (i != stepsWithRide.length - 1) {
                points.push(<span className="dot"></span>);
            }
        }
        return points;
    }

    toggleRouteDetail = (index) => {
        const results = this.state.results;
        results[index].show = !results[index].show;
        debugger;
        this.setState({
            results: [
                ...results,
            ]

        })
    }

    render() {

        const results = this.state.results.map((item, index) => {
            let routePath = this.getRoutePath(item.steps);
            return (<div  className="route" onClick={() => this.toggleRouteDetail(index)}>
                {routePath}
                <RouteDetail show={this.state.results[index].show} key={index} steps={item.steps} index={index}/>
            </div>)
        });

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

                    <h3 style={{ clear: 'both' }}>Suggested routes</h3>
                    <div id='results'>
                        {results}
                    </div>
                </Grid>
            </div >
        )
    }
}

export default App;
