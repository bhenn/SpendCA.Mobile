import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import {
    changeEmail,
    changePassword,
    registerUser,
    changeName
} from "../actions/UserActions";

class newUserScreen extends Component {
    _registerUser() {
        this.props.registerUser(
            this.props.email,
            this.props.password,
            this.props.name
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Input
                    label={'Name'}
                    value={this.props.name}
                    onChangeText={text => this.props.changeName(text)}
                />
                <Input
                    label={'E-mail'}
                    value={this.props.email}
                    onChangeText={text => this.props.changeEmail(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                />
                <Input
                    label={'Password'}
                    value={this.props.password}
                    onChangeText={text => this.props.changePassword(text)}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Button
                    style={{ marginTop: 20 }}
                    buttonStyle={{ backgroundColor: '#FF473A' }}
                    title="Register"
                    onPress={() => this._registerUser()}
                    loading={this.props.loading}
                />
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.regiserErrorMessage}>
                        {this.props.registerError}
                    </Text>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    email: state.UserReducer.email,
    password: state.UserReducer.password,
    registerError: state.UserReducer.registerError,
    name: state.UserReducer.name,
    loading: state.UserReducer.registerLoading
});

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    regiserErrorMessage: {
        marginTop: 20,
        fontSize: 16,
        width: 300,
        alignItems: "center",
    }
});

export default connect(
    mapStateToProps,
    { changeEmail, changePassword, changeName, registerUser }
)(newUserScreen);
