import React, { Component } from "react";
import { View } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import { connect } from "react-redux";
import { changeDescription, addCategory } from "../actions/CategoryActions";

class CategoryAddScreen extends Component {
    static navigationOptions = {
        headerTintColor: "black",
        headerStyle: {
            backgroundColor: "#b2dbbf"
        }
    };

    _addCategory() {
        this.props.addCategory(this.props.description);
    }

    render() {
        return (
            <View>
                <FormLabel>Description</FormLabel>
                <FormInput
                    value={this.props.description}
                    onChangeText={text => this.props.changeDescription(text)}
                />

                <Button onPress={() => this._addCategory()} title="Submit" />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    description: state.CategoryReducer.description,
});

export default connect(
    mapStateToProps,
    { changeDescription, addCategory }
)(CategoryAddScreen);
