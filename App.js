import React, { Component } from "react";
import Nav from "./src/navigators/AppNavigator";
import firebase from "firebase";
import ReduxThunk from "redux-thunk";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import combineReducers from "./src/reducers/index";


//import StorybookUIRoot from "./storybook";

const store = createStore(combineReducers, {}, applyMiddleware(ReduxThunk));
class App extends Component {
    componentWillMount() {
        // Initialize Firebase
        var config = {
            
        };
        firebase.initializeApp(config);
    }

    render() {
        return (
            <Provider store={store}>
                <Nav />
            </Provider>
        );
    }
}

export default App;
//export default StorybookUIRoot
