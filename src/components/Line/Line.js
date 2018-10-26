import React from 'react';
import {LINES, MRT_STOP_LINES} from './../constant';
const LineInfo = (props) => {
    const colorForLine = ColorFromLine(props.line);
    return (<div className="point" style={{backgroundColor: colorForLine}}>{props.line}</div>)
}

const ColorFromLine = (line) => {
    if(line) {
        return LINES[line].color;
    }
    return '#fff';
}

export default LineInfo;