
import React, { Component } from 'react';
import RouteDetailLine from './RouteDetailLine';
class RouteDetail extends Component {
    render() {
        const steps = this.props.steps;
        let details = [];
        for(let i = 0; i < steps.length; i ++){
            details.push(<RouteDetailLine  item={steps[i]} />);
        }
        return <div style={{display: this.props.show ? 'block': 'none', marginLeft: 20, marginTop: 5}}>{details}</div>;
    }
}

export default RouteDetail;