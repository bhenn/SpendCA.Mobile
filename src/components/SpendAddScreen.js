import React, { Component } from "react";
import { View, TouchableOpacity, StyleSheet, Alert, TextInput } from "react-native";
import { Input, Button, Text, Icon } from "react-native-elements";
import { connect } from "react-redux";
import {
    changeDescription,
    changeLocation,
    changeValue,
    changeCategory,
    changeDate,
    addSpend,
    alterSpend,
    deleteSpend
} from "../actions/SpendActions";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import { TextInputMask } from "react-native-masked-text";
import NavigationService from "../../NavigationService";

class SpendAddScreen extends Component {

    constructor(props) {
        super(props);

        this.inputRefs = {};
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: '',
            headerTintColor: "white",
            headerStyle: {
                backgroundColor: "#457B9D"
            },
            headerRight: () => (
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
        datePickerVisible: false,
    };

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

        const { id, description, location, category_id, date } = this.props

        if (this.props.id != null) {
            this.props.alterSpend({ id, description, location, category_id, date, value });
        } else {
            this.props.addSpend({ description, location, category_id, date, value });
        }
    }

    _validate() {

        let error = ''
        if (this.props.date == '' || this.props.date == undefined)
            error = error.concat('Date is required \n')

        if (this.props.description.trim() == '' || this.props.description == undefined)
            error = error.concat('Description is required \n')

        if (Number(this.props.value) == 0 || this.props.value == undefined)
            error = error.concat('Value is required \n')

        if (this.props.category_id == null || this.props.category_id == undefined || this.props.category_id == 0)
            error = error.concat('Category is required \n')

        return error
    }

    _deleteSpend() {
        Alert.alert(
            '',
            'Delete spend?',
            [
                { text: 'Cancel', onPress: () => false, style: 'cancel' },
                { text: 'Delete', onPress: () => this.props.deleteSpend(this.props.id) },
            ],
            { cancelable: false }
        )
    }

    render() {
        let deleteButton;
        if (this.props.id != undefined && this.props.id != 0) {
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
                    <Input
                        label={'Location'}
                        value={this.props.location}
                        onChangeText={text => this.props.changeLocation(text)}
                    />
                    <TouchableOpacity onPress={() => NavigationService.navigate("CategorySelect")}>
                        <Input
                            label={'Category'}
                            value={this.props.category_desc}
                            editable={false}
                            pointerEvents="none"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    {deleteButton}
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    id: state.SpendReducer.id,
    value: state.SpendReducer.value,
    description: state.SpendReducer.description,
    location: state.SpendReducer.location,
    date: state.SpendReducer.date,
    category_id: state.SpendReducer.category_id,
    category_desc: state.SpendReducer.category_desc,
});

export default connect(
    mapStateToProps,
    {
        changeDescription,
        changeLocation,
        changeValue,
        changeCategory,
        changeDate,
        addSpend,
        alterSpend,
        deleteSpend
    }
)(SpendAddScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: 'white',
    },
    valueContainer: {
        flex: 0.5,
        justifyContent: 'center',
    },
    dataContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 0.5,
        justifyContent: 'center',
    },
    inputValue: {
        justifyContent: 'center',
        textAlign: 'center',
        fontSize: 36,
        borderWidth: 0.5,
        borderColor: 'rgba(204, 204, 204, 0.6)',
        color: '#457B9D',
    }
});

