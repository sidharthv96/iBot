const initialState = [];



export function sensors(state=initialState, action) {

    switch (action.type) {
        case 'FETCH_SENSORS':
            // console.log(...action.sensors);
            // console.log(...state);
            return [...action.sensors];

        default:
            return state;
    }
}



export function actuators(state=initialState, action) {

    switch (action.type) {
        case 'FETCH_ACTUATORS':
            // console.log(state);
            // console.log(...state);
            return [...action.actuators];

        default:
            return state;
    }
}