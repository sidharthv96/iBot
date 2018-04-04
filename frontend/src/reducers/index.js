import {combineReducers} from 'redux';
import {actuators, sensors} from "./devices";


const iBotApp = combineReducers({
  sensors,actuators
});

export default iBotApp;