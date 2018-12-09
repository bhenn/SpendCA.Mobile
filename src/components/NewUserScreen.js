import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
import { Button, Text } from "react-native-elements";
import {
    changeEmail,
    changePassword,
    registerUser,
    changeName
} from "../actions/UserActions";
import LinearGradient from "react-native-linear-gradient";
import InputWhite from './InputWhite'

class newUserScreen extends Component {

    static navigationOptions = {
        header: null
    }

    _registerUser() {
        this.props.registerUser(
            this.props.email,
            this.props.password,
            this.props.name
        );
    }

    render() {
        return (
            <LinearGradient
                colors={['#FF8126', '#910947']}
                style={styles.container}
            >
                <View style={styles.logo}>
                    <View>
                        <Text style={{ color: "white", fontSize: 30 }}>Spend</Text>
                    </View>
                    <View>
                        <Text style={{ color: "white", fontSize: 40 }}>CA</Text>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <InputWhite
                        value={this.props.name}
                        onChangeText={text => this.props.changeName(text)}
                        placeholder={'Name'}
                        iconName='user'
                    />
                    <InputWhite
                        value={this.props.email}
                        onChangeText={text => this.props.changeEmail(text)}
                        autoCapitalize="none"
                        autoCorrect={false}
                        keyboardType="email-address"
                        placeholder={'E-mail'}
                        iconName='mail'
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
                    <Button
                        title="Create account"
                        onPress={() => this._registerUser()}
                        buttonStyle={{ marginTop: 50, marginBottom: 20, backgroundColor: '#FF473A', height: 40, width: 300 }}
                        loadingProps={{ size: "small", color: "white" }}
                        disabled={this.props.loading}
                        disabledStyle={{backgroundColor: '#BC2E24'}}
                        loading={this.props.loading}
                    />
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.regiserErrorMessage}>
                            {this.props.registerError}
                        </Text>
                    </View>
                    <Text style={{ color: "rgba(255, 255, 255, 0.7)" }}>Already have an account ?</Text>
                    <Text
                        style={{ color: "white", fontWeight: 'bold' }}
                        onPress={() =>
                            this.props.navigation.navigate("Login")
                        }
                    >
                        Login
                </Text>
                </View>

            </LinearGradient>
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
        flex: 1,
        alignItems: "center",
        paddingTop: 50,
    },
    logo: {
        flex: 1
    },
    regiserErrorMessage: {
        marginTop: 20,
        fontSize: 16,
        width: 300,
        alignItems: "center",
    },
    inputContainer: {
        flex: 3,
        marginTop: 150,
        width: 300,
        height: 150,
        alignItems: 'center'
    }
});

export default connect(
    mapStateToProps,
    { changeEmail, changePassword, changeName, registerUser }
)(newUserScreen);
