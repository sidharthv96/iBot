import { combineReducers } from 'redux';
import devices from "./devices";


const iBotApp = combineReducers({
  devices,
})

export default iBotApp;