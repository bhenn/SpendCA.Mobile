import React, { Component } from "react";
import Nav from "./src/navigators/AppNavigator";
import ReduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import combineReducers from "./src/reducers/index";
import Reactotron from "./reactotron/ReactotronConfig";

// import StorybookUIRoot from "./storybook";

const store = {}

if (__DEV__) {
    store = Reactotron.createStore(combineReducers, applyMiddleware(ReduxThunk))
}else{
    store = createStore(combineReducers, {}, applyMiddleware(ReduxThunk));
}

class App extends Component {
    componentWillMount() {
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
