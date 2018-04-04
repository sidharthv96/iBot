export const addDevice = text => {
    return {
        type: 'ADD_DEVICE',
        text
    }
};

export const updateDevice = (id, text) => {
    return {
        type: 'UPDATE_DEVICE',
        id,
        text
    }
};

export const deleteDevice = id => {
    return {
        type: 'DELETE_DEVICE',
        id
    }
};

export const fetchSensors = () => {
    return dispatch => {
        let headers = {"Content-Type": "application/json"};
        return fetch("/api/sensors/", {headers, })
            .then(res => res.json())
            .then(sensors => {
                return dispatch({
                    type: 'FETCH_SENSORS',
                    sensors
                })
            })
    }
};

        // $("#sensor_event").load("/options?type=sensor&pk=" + $("#sensor").val());

export const fetchSensorEvents = () => {
    return dispatch => {
        let headers = {"Content-Type": "application/json"};
        return fetch("/options/json/?type=sensor&pk=", {headers, })
            .then(res => res.json())
            .then(sensors => {
                return dispatch({
                    type: 'FETCH_SENSORS',
                    sensors
                })
            })
    }
};

export const fetchActuators = () => {
    return dispatch => {
        let headers = {"Content-Type": "application/json"};
        return fetch("/api/actuators/", {headers,})
            .then(res => res.json())
            .then(actuators => {
                return dispatch({
                    type: 'FETCH_ACTUATORS',
                    actuators
                })
            })
    }
};