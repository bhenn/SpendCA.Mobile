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
                            onPress={() =>
                                this.props.doLogin(
                                    this.props.email,
                                    this.props.password
                                )
                            }
                            buttonStyle={{ marginBottom: 20, backgroundColor: '#E63946', height: 40, width: 300 }}
                            style={{marginTop: 120}}
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
        flex: 2
    },
    loginInput: {
        flex: 2.5,
        marginTop: 50,
        width: 300,
        height: 150,
        alignItems: 'center'
    },
    loginErrorMessage: {
        marginTop: 10,
        fontSize: 16,
        width: 300,
        alignItems: "center"
    },

});

export default connect(
    mapStateToProps,
    { changeEmail, changePassword, doLogin }
)(loginScreen);
