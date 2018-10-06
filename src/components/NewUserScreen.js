import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
import { FormLabel, FormInput, Button, Text } from "react-native-elements";
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
            <View>
                <FormLabel>Name</FormLabel>
                <FormInput
                    value={this.props.name}
                    onChangeText={text => this.props.changeName(text)}
                />
                <FormLabel>E-mail</FormLabel>
                <FormInput
                    value={this.props.email}
                    onChangeText={text => this.props.changeEmail(text)}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                />
                <FormLabel>Password</FormLabel>
                <FormInput
                    value={this.props.password}
                    onChangeText={text => this.props.changePassword(text)}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Button
                    style={{ paddingTop: 20 }}
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
