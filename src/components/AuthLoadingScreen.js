import React from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import { getUserToken } from "../actions/UserActions";
import { connect } from "react-redux";

class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {

        this.props.getUserToken().then(() => {
            this.props.navigation.navigate(this.props.token ? 'Home'  : 'Auth')
        })

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

const mapStateToProps = state => ({
    token: state.UserReducer.token
});

export default connect(mapStateToProps, {getUserToken})(AuthLoadingScreen);
