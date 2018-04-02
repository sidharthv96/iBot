import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";

import iBotApp from "./reducers";


import iBot from "./components/iBot";
import NotFound from "./components/NotFound";

import './App.css';
import AddRule from "./components/AddRule";

let store = createStore(iBotApp, applyMiddleware(thunk));


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={iBot} />
                        <Route exact path="/rule/add" component={AddRule} />
                        <Route component={NotFound} />
                    </Switch>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;