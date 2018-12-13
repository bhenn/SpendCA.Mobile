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
                {/* <Button 
                style={{marginTop:10}}
                buttonStyle={{ backgroundColor: '#E63946' }}
                onPress={() => this._addCategory()} title="Save" /> */} */}
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
