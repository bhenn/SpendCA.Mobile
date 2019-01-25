import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Button, Text } from "react-native-elements";
import { changeEmail, changePassword, doLogin } from "../actions/UserActions";
import InputWhite from './InputWhite'

class loginScreen extends Component {
    static navigationOptions = {
        header: null
    };

    _doLogin() {
        let error = this._validate()
        if (error != '') {
            alert(error)
            return false
        }

        this.props.doLogin(this.props.email, this.props.password)
    }

    _validate() {
        let error = ''
        if (this.props.email == undefined || this.props.email.trim() == '')
            error = error.concat('Email is required \n')

        if (this.props.password == undefined || this.props.password.trim() == '')
            error = error.concat('Password is required \n')

        return error
    }

    render() {
        return (
            <ImageBackground source={require('../../background.jpeg')} style={styles.container}>
                <View style={styles.overlay}>
                    <View style={styles.logo}>
                        <View>
                            <Text style={{ color: "white", fontSize: 30 }}>Spend</Text>
                        </View>
                        <View>
                            <Text style={{ color: "white", fontSize: 40 }}>CA</Text>
                        </View>
                    </View>
                    <View style={styles.loginInput}>
                        <InputWhite
                            value={this.props.email}
                            onChangeText={text => this.props.changeEmail(text)}
                            autoFocus={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            placeholder={'E-mail'}
                            iconName={'mail'}
                        />
                        <InputWhite
                            value={this.props.password}
                            onChangeText={text => this.props.changePassword(text)}
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder={'Password'}
                            iconName='lock'
                        />
                        <Text style={styles.loginErrorMessage}>
                            {this.props.loginError}
                        </Text>
                        <Button
                            title="Login"
                            onPress={() => this._doLogin()}
                            buttonStyle={{ backgroundColor: '#E63946', height: 40, width: 300 }}
                            style={{ marginTop: 120, marginBottom: 10 }}
                            loadingProps={{ size: "small", color: "white" }}
                            disabled={this.props.loadingLogin}
                            disabledStyle={{ backgroundColor: '#BC2E24' }}
                            loading={this.props.loadingLogin}
                        />

                        <Text style={{ color: "rgba(255, 255, 255, 0.8)" }}>New here ?</Text>
                        <Text
                            style={{ color: "white", fontWeight: 'bold' }}
                            onPress={() =>
                                this.props.navigation.navigate("NewAccount")
                            }
                        >
                            Create an account
                    </Text>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
    email: state.UserReducer.email,
    password: state.UserReducer.password,
    loginError: state.UserReducer.loginError,
    loadingLogin: state.UserReducer.loginLoading
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: "center",
    },
    logo: {
        flex: 2,
        justifyContent: 'center'
    },
    loginInput: {
        flex: 2.5,
        width: 300,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginErrorMessage: {
        fontSize: 16,
        width: 300,
        alignItems: "center",
        justifyContent: 'center'
    },

});

export default connect(
    mapStateToProps,
    { changeEmail, changePassword, doLogin }
)(loginScreen);
