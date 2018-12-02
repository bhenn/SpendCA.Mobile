import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet } from "react-native";
import { Input, Button, Text, Icon } from "react-native-elements";
import { changeEmail, changePassword, doLogin } from "../actions/UserActions";
import LinearGradient from "react-native-linear-gradient";

class loginScreen extends Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <LinearGradient
                colors={['#FF8126', '#910947']}
                style={styles.container}
            >
                <View>
                    <View style={styles.logo}>
                        <View>
                            <Text style={{ color: "white", fontSize: 30 }}>Spend</Text>
                        </View>
                        <View>
                            <Text style={{ color: "white", fontSize: 40 }}>CA</Text>
                        </View>
                    </View>
                    <View style={styles.loginInput}>
                        <Input
                            value={this.props.email}
                            onChangeText={text => this.props.changeEmail(text)}
                            autoFocus={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            leftIcon={
                                <Icon
                                    type='feather'
                                    name='mail'
                                    color='white'
                                />
                            }
                            placeholder={'E-mail'}
                            style={{ color: 'white' }}
                            color={'white'}
                            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        />
                        <Input
                            value={this.props.password}
                            onChangeText={text =>
                                this.props.changePassword(text)
                            }
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                            placeholder={'Password'}
                            leftIcon={
                                <Icon
                                    type='feather'
                                    name='lock'
                                    color='white'
                                />
                            }
                            style={{ color: 'white' }}
                            color={'white'}
                            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                        />
                        <Text style={styles.loginErrorMessage}>
                            {this.props.loginError}
                        </Text>
                        <Button
                            title="LOG IN"
                            onPress={() =>
                                this.props.doLogin(
                                    this.props.email,
                                    this.props.password
                                )
                            }
                            loadingProps={{ size: "large", color: "#f96872" }}
                            loading={this.props.loadingLogin}
                            disabled={this.props.loadingLogin}
                            buttonStyle={{ marginTop: 50, marginBottom: 20, backgroundColor: '#FF473A' }}
                        />

                        <Text style={{ color: "white" }}>New here ?</Text>
                        <Text
                            style={{ color: "white" }}
                            onPress={() =>
                                this.props.navigation.navigate("NewAccount")
                            }
                        >
                            Create an account
                    </Text>
                    </View>
                </View>
            </LinearGradient>
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
        alignItems: "center",
        paddingTop: 50,
    },
    logo: {
        flex: 1
    },
    loginInput: {
        flex: 2,
        marginTop: 150,
        width: 300,
        height: 150
    },
    loginErrorMessage: {
        marginTop: 10,
        fontSize: 16,
        width: 300,
        alignItems: "center"
    },
    newAccount: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default connect(
    mapStateToProps,
    { changeEmail, changePassword, doLogin }
)(loginScreen);
