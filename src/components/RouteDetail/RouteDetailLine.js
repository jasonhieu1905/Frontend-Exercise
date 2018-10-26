import React from 'react';
import LineInfo from './../Line/Line';
const routeDetailLine = (props) => {                
    var renderLine = [];
    switch(props.item.type) {
        case 'walk':
            renderLine.push(`Walk from ${props.item.from} -> ${props.item.to}`);
            break;
        case 'ride':
            let lineInfo = <LineInfo line={props.item.line} />;
            renderLine.push(<div className="route-detail-line">{lineInfo} {props.item.from} -> {props.item.to}</div>);
            break;
        case 'change':
            let lineFrom = <LineInfo line={props.item.from} />;
            let lineTo = <LineInfo line={props.item.to} />;
            renderLine.push(<div className="route-detail-line">{lineFrom} {lineTo} with station {props.item.station}</div>);
            break;
        default:
            break;    
    }
    return (<div className={props.item.type}>
        {renderLine}</div>)
}


export default routeDetailLine;