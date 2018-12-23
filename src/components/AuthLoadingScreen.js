import React from "react";
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";
import firebase from 'firebase'

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        // const userToken = await AsyncStorage.getItem('userToken');

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        // this.props.navigation.navigate(userToken ? "App" : "Auth");
        // setTimeout(() => {
            firebase.auth().onAuthStateChanged(user => {
                this.props.navigation.navigate(user ? 'Home'  : 'Auth')
            })
             
        // }, 500);
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={{ flex: 1, paddingTop: 450 }}>
                <ActivityIndicator size="large" color="#457B9D" />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}
