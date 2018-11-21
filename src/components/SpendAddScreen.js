import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { FormLabel, FormInput, Button } from "react-native-elements";
import { connect } from "react-redux";
import {
    changeDescription,
    changeValue,
    changeCategory,
    changeDate,
    addSpend,
    alterSpend,
    deleteSpend
} from "../actions/SpendActions";
import { categoryFetch } from "../actions/CategoryActions";
import SimplePicker from "react-native-simple-picker";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { TextInputMask } from "react-native-masked-text";


class SpendAddScreen extends Component {
    static navigationOptions = {
        headerTintColor: "black",
        headerStyle: {
            backgroundColor: "#b2dbbf"
        }
    };

    state = {
        datePickerVisible: false
    };

    componentWillMount() {
        this.props.categoryFetch();
    }

    _saveSpend() {
        let error = this._validate()
        if (error != ''){
            alert(error)
            return false
        }

        //TODO find a better way to transform in int
        let value = this.props.value.replace(',', '').replace(',', '').replace(',', '') * 100

        if (this.props.uid != "") {
            this.props.alterSpend({
                uid: this.props.uid,
                description: this.props.description,
                value: value,
                category: this.props.category,
                date: this.props.date
            });
        } else {
            this.props.addSpend(
                this.props.description,
                value,
                this.props.category,
                this.props.date
            );
        }
    }

    _validate() {
        
        let error = ''
        if (this.props.date == '' || this.props.date == undefined)
            error = error.concat('Date is required \n')

        if (this.props.description == '' || this.props.description == undefined)
            error = error.concat('Description is required \n')

        if (Number(this.props.value) == 0 || this.props.value == undefined)
            error = error.concat('Value is required \n')

        if (Number(this.props.category) == 0 || this.props.category == undefined)
            error = error.concat('Category is required \n')

        return error
    }

    _deleteSpend() {
        this.props.deleteSpend(this.props.uid);
    }

    render() {
        let deleteButton;
        if (this.props.uid != undefined && this.props.uid != "") {
            deleteButton = (
                <Button
                    style={{ marginTop: 15 }}
                    onPress={() => this._deleteSpend()}
                    title="Delete"
                />
            );
        }

        return (
            <View>
                <TextInputMask
                    style={styles.input}
                    value={this.props.value}
                    onChangeText={text => this.props.changeValue(text)}
                    type="money"
                    options={{ separator: '.', delimiter: ',', unit: '' }}
                    maxLength={10}
                />
                <TouchableOpacity
                    onPress={() => this.setState({ datePickerVisible: true })}
                >
                    <FormLabel>Date</FormLabel>
                    <FormInput
                        value={moment(new Date(this.props.date)).format("LL")}
                        editable={false}
                        pointerEvents="none"
                    />
                </TouchableOpacity>
                <DateTimePicker
                    isVisible={this.state.datePickerVisible}
                    onConfirm={date => {
                        this.props.changeDate(date);
                        this.setState({ datePickerVisible: false });
                    }}
                    onCancel={() => this.setState({ datePickerVisible: false })}
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
                <Button
                    style={{ marginTop: 15 }}
                    onPress={() => this._saveSpend()}
                    title="Save"
                />
                {deleteButton}
            </View>
        );
    }
}

const mapStateToProps = state => ({
    uid: state.SpendReducer.uid,
    value: state.SpendReducer.value,
    description: state.SpendReducer.description,
    date: state.SpendReducer.date,
    category: state.SpendReducer.category,
    categories_array: state.CategoryListReducer.categories_array
});

export default connect(
    mapStateToProps,
    {
        changeDescription,
        changeValue,
        changeCategory,
        changeDate,
        addSpend,
        categoryFetch,
        alterSpend,
        deleteSpend
    }
)(SpendAddScreen);

const styles = StyleSheet.create({
    input: {
        marginTop: 50,
        marginBottom: 50,
        height: 40,
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 36,
        borderWidth: 0.5,
        borderColor: 'white',
        color: '#909ca6',
    }
});
