import React, { Component } from "react";
import { connect } from "react-redux";
import { View, StyleSheet} from "react-native";
import { FormInput, FormLabel, Button, Text } from "react-native-elements";
import { changeEmail, changePassword, doLogin } from "../actions/UserActions";

class loginScreen extends Component {
    
    static navigationOptions = {
        headerMode: 'none'
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.loginView}>
                    <View style={styles.loginTitle}>
                        <View>
                            <Text style={{ fontSize: 30 }}>Spend</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 40 }}>CA</Text>
                        </View>
                    </View>
                    <View style={styles.loginInput}>
                        <FormLabel>E-mail</FormLabel>
                        <FormInput
                            value={this.props.email}
                            onChangeText={text => this.props.changeEmail(text)}
                            autoFocus={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                        />
                        <FormLabel>Password</FormLabel>
                        <FormInput
                            value={this.props.password}
                            onChangeText={text =>
                                this.props.changePassword(text)
                            }
                            secureTextEntry={true}
                            autoCapitalize="none"
                            autoCorrect={false}
                        />
                    </View>
                    <Button
                        onPress={() =>
                            this.props.doLogin(
                                this.props.email,
                                this.props.password
                            )
                        }
                        title="LOG IN"
                        underlayColor="transparent"
                        buttonStyle={{ marginTop: 20 }}
                        loading={this.props.loadingLogin}
                        disabled={this.props.loadingLogin}
                    />
                    <Text style={styles.loginErrorMessage}>
                        {this.props.loginError}
                    </Text>
                </View>
                <View style={styles.newAccount}>
                    <Text style={{ color: "grey" }}>New here ?</Text>
                    <Text style={{ color: "grey" }} onPress={() => this.props.navigation.navigate('NewAccount')}>Create an account</Text> 
                </View>
            </View>
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
        paddingTop: 50
    },
    loginView: {},
    loginTitle: {},
    loginInput: {
        marginTop: 150,
        width: 300,
        height: 150
    },
    loginErrorMessage: {
        marginTop: 20,
        fontSize: 16,
        width: 300,
        alignItems: "center"
    },
    newAccount: {
        marginTop: 20,
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default connect(
    mapStateToProps,
    { changeEmail, changePassword, doLogin }
)(loginScreen);
