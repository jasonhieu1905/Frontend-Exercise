import MRT_DATA from './../routing/mrt.json';
export const LINES = MRT_DATA.lines;

export const MRT_STOP_LINES = (() => {
    let mrtStopLines = [];
    for(let key of Object.keys(LINES)) {
        let routesOfKey = LINES[key].route;
        for(let route of routesOfKey){
            let values;
            let keyRoutes = mrtStopLines.filter(item => item.key == route);
            if(keyRoutes.length > 0) {
                values = keyRoutes[0].values;
            } 
            if(values) {
                mrtStopLines.filter(item => item.key == route)[0].values = values.concat(key);
            } else {
                mrtStopLines.push({key: route,
                    values: [].concat(key)});
            }
            
        }
    }

    // filter MRT Stop Line with more than 1 line
    console.log(mrtStopLines.filter(item => item.values.length > 1));
    return mrtStopLines.filter(item => item.values.length > 1);
})()

