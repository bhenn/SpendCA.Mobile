import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
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
            <View style={styles.container}>
                <Input
                    label={'Description'}
                    value={this.props.description}
                    onChangeText={text => this.props.changeDescription(text)}
                />
                <Button 
                style={{marginTop:10}}
                onPress={() => this._addCategory()} title="Save" /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})

const mapStateToProps = state => ({
    description: state.CategoryReducer.description,
});

export default connect(
    mapStateToProps,
    { changeDescription, addCategory }
)(CategoryAddScreen);
