import React, { Component } from "react";
import Nav from "./src/navigators/AppNavigator";
import ReduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import combineReducers from "./src/reducers/index";
// import Reactotron from "./reactotron/ReactotronConfig";

import Icon from "react-native-vector-icons/MaterialIcons";
import IconFeather from "react-native-vector-icons/Feather";
import IonIcons  from "react-native-vector-icons/Ionicons";

Icon.loadFont();
IconFeather.loadFont();
IonIcons.loadFont();

// import StorybookUIRoot from "./storybook";

// var store = {}

// if (__DEV__) {
//     store = Reactotron.createStore(combineReducers, applyMiddleware(ReduxThunk))
// }else{
//     store = createStore(combineReducers, {}, applyMiddleware(ReduxThunk));
// }


const store = createStore(combineReducers, {}, applyMiddleware(ReduxThunk));

class App extends Component {
    
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
