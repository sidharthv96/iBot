const initialState = [];



export default function devices(state=initialState, action) {
    let deviceList = state.slice();

    switch (action.type) {

        case 'ADD_DEVICE':
            return [...state, {text: action.text}];

        case 'UPDATE_DEVICE':
            let deviceToUpdate = deviceList[action.id]
            deviceToUpdate.text = action.text;
            deviceList.splice(action.id, 1, deviceToUpdate);
            return deviceList;

        case 'DELETE_DEVICE':
            deviceList.splice(action.id, 1);
            return deviceList;

        case 'FETCH_SENSORS':
            // console.log(state);
            // console.log(...state);
            return [...action.sensors];

        default:
            return state;
    }
}
