import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Input, Button, Text, Icon } from "react-native-elements";
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
    }

    state = {
        datePickerVisible: false
    };

    componentWillMount() {
        this.props.categoryFetch();
    }

    componentDidMount() {
        this.props.navigation.setParams({ save: this._saveSpend })
    }

    _saveSpend = () => {
        let error = this._validate()
        if (error != '') {
            alert(error)
            return false
        }

        let value = this.props.value
        if (this.props.value.includes('.')) {
            value = Math.round(100 * parseFloat(this.props.value.replace(/[$,]/g, '')))
        } else {
            value = parseFloat(this.props.value)
        }

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
        Alert.alert(
            '',
            'Delete spend?',
            [
                { text: 'Cancel', onPress: () => false, style: 'cancel' },
                { text: 'Delete', onPress: () => this.props.deleteSpend(this.props.uid) },
            ],
            { cancelable: false }
        )


    }

    render() {
        let deleteButton;
        if (this.props.uid != undefined && this.props.uid != "") {
            deleteButton = (
                <Button
                    style={{ marginTop: 15, }}
                    buttonStyle={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: '#E63946', }}
                    titleStyle={{ color: "#E63946" }}
                    onPress={() => this._deleteSpend()}
                    title="Delete"
                    icon={
                        <Icon
                            type='feather'
                            name={'trash'}
                            color='#E63946'
                        />
                    }
                />
            );
        }

        return (
            <View style={styles.container}>
                <View style={styles.valueContainer}>
                    <TextInputMask
                        ref={ref => (this._valueInput = ref)}
                        style={styles.inputValue}
                        value={this.props.value}
                        onChangeText={text => this.props.changeValue(text)}
                        type="money"
                        options={{ separator: '.', delimiter: ',', unit: '' }}
                        maxLength={10}
                    />
                </View>
                <View style={styles.dataContainer}>
                    <TouchableOpacity
                        onPress={() => this.setState({ datePickerVisible: true })}
                    >
                        <Input
                            label={'Date'}
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
                    <Input
                        label={'Description'}
                        value={this.props.description}
                        onChangeText={text => this.props.changeDescription(text)}
                    />
                    <TouchableOpacity onPress={() => this.refs.picker.show()}>
                        <Input
                            label={'Category'}
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
                </View>
                <View style={styles.buttonContainer}>
                    {deleteButton}
                </View>
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
    container: {
        flex: 1,
        padding: 20,
    },
    valueContainer: {
        flex: 1,
        paddingTop: 50,
    },
    dataContainer: {
        flex: 1
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    inputValue: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 36,
        borderWidth: 0.5,
        borderColor: 'white',
        color: '#457B9D',
    }
});
