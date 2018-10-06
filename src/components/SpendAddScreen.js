import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { FormLabel, FormInput, Button, Text } from "react-native-elements";
import { connect } from "react-redux";
import {
    changeDescription,
    changeValue,
    changeCategory,
    changeDate,
    addSpend
} from "../actions/SpendActions";
import { categoryFetch } from "../actions/CategoryActions";
import SimplePicker from "react-native-simple-picker";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment'

class SpendAddScreen extends Component {
    static navigationOptions = {
        headerTintColor: "black",
        headerStyle: {
            backgroundColor: "#b2dbbf"
        }
    };

    state = { 
        datePickerVisible: false
    }

    componentWillMount() {
        this.props.categoryFetch();
        this.props.changeDate(new Date())
    }

    _addSpend() {
        this.props.addSpend(
            this.props.description,
            this.props.value,
            this.props.category,
            this.props.date,
        );
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={() => this.setState({datePickerVisible: true})}>
                    <FormLabel>Date</FormLabel>
                    <FormInput
                        value={moment(this.props.date).format('LL')}
                        editable={false}
                        pointerEvents="none"
                    />
                </TouchableOpacity>
                <DateTimePicker
                    isVisible={this.state.datePickerVisible}
                    onConfirm={date => {
                        this.props.changeDate(date)
                        this.setState({datePickerVisible: false})
                    }}
                    onCancel={() => this.setState({datePickerVisible: false})}
                />

                <FormLabel>Description</FormLabel>
                <FormInput
                    value={this.props.description}
                    onChangeText={text => this.props.changeDescription(text)}
                />

                <TouchableOpacity onPress={() => this.refs.picker.show()}>
                    <FormLabel>Category</FormLabel>
                    <FormInput
                        value={this.props.category}
                        editable={false}
                        pointerEvents="none"
                        onPress={() => this.refs.picker.show()}
                    />
                </TouchableOpacity>
                <SimplePicker
                    ref={"picker"}
                    options={this.props.categories_array}
                    onSubmit={option => {
                        this.props.changeCategory(option);
                    }}
                />
                <FormLabel>Value</FormLabel>
                <FormInput
                    value={this.props.value}
                    onChangeText={text => this.props.changeValue(text)}
                    keyboardType={"numeric"}
                />
                <Button
                    style={{ marginTop: 15 }}
                    onPress={() => this._addSpend()}
                    title="Submit"
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    value: state.SpendReducer.value,
    description: state.SpendReducer.description,
    date: state.SpendReducer.date,
    category: state.SpendReducer.category,
    categories_array: state.CategoryListReducer.categories_array,
});

export default connect(
    mapStateToProps,
    {
        changeDescription,
        changeValue,
        changeCategory,
        changeDate,
        addSpend,
        categoryFetch
    }
)(SpendAddScreen);
