import React, { Component } from "react";
import { View } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import { connect } from "react-redux";
import { changeDescription, addCategory } from "../actions/CategoryActions";

class CategoryAddScreen extends Component {
    static navigationOptions = {
        headerTintColor: "black",
        headerStyle: {
            backgroundColor: "#f96872"
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
                <Button 
                style={{marginTop:10}}
                onPress={() => this._addCategory()} title="Save" />
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
