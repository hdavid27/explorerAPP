
import React, { Component } from 'react';
import { Switch } from "react-router";
import { HashRouter, Route} from "react-router-dom";
import {Provider} from 'react-redux';

import appStore from './store'
import Home from './components/Home';
import FileExplorer from './components/file_explorer/FileExplorer';

export default class App extends Component {

    render() {
        return (
            <Provider store={appStore}>
                <HashRouter>
                    <Switch>
                        <Route exact path={"/"} component={Home}></Route>
                        <Route path={"/fileexplorer"} component={FileExplorer}/>
                    </Switch>
                </HashRouter>
            </Provider>
        )
    }
}
