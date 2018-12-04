import React, { Component } from "react";
import Nav from "./src/navigators/AppNavigator";
import firebase from "firebase";
import ReduxThunk from "redux-thunk";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import combineReducers from "./src/reducers/index";
import Config from "react-native-config";


//import StorybookUIRoot from "./storybook";

const store = createStore(combineReducers, {}, applyMiddleware(ReduxThunk));
class App extends Component {
    componentWillMount() {
        // Initialize Firebase
        var config = {
            apiKey: Config.FIREBASE_API_KEY,
            authDomain: Config.FIREBASE_AUTH_DOMAIN,
            databaseURL: Config.FIREBASE_DATABASE_URL,
            projectId: Config.FIREBASE_PROJECT_ID,
            storageBucket: Config.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: Config.FIREBASE_MESSAGE_SENDER_ID
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
