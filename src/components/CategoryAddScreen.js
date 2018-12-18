import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Input, Text } from "react-native-elements";
import { connect } from "react-redux";
import { changeDescription, addCategory } from "../actions/CategoryActions";

class CategoryAddScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: "white",
            headerStyle: {
                backgroundColor: "#457B9D"
            },
            headerRight: (
                <TouchableOpacity
                    onPress={navigation.getParam('save')}
                    style={{ alignItems: 'center', justifyContent: 'center', padding: 5, paddingRight: 15 }}
                >
                    <Text style={{ color: 'white', fontSize: 18 }} >Save</Text>
                </TouchableOpacity>
            ),
        }

    };

    componentDidMount() {
        this.props.navigation.setParams({ save: this._addCategory })
    }

    _addCategory = () => {
        let error = this._validate()
        if (error != '') {
            alert(error)
            return false
        }

        this.props.addCategory(this.props.description);
    }

    _validate() {
        let error = ''
        if (this.props.description.trim() == '' || this.props.description == undefined)
            error = error.concat('Description is required \n')

        return error
    }

    render() {
        return (
            <View style={styles.container}>
                <Input
                    label={'Description'}
                    value={this.props.description}
                    onChangeText={text => this.props.changeDescription(text)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
        
    }
})

const mapStateToProps = state => ({
    description: state.CategoryReducer.description,
});

export default connect(
    mapStateToProps,
    { changeDescription, addCategory }
)(CategoryAddScreen);
