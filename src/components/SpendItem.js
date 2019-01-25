import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { changeSpend } from "../actions/SpendActions";
import NavigationService from "../../NavigationService";
import moment from 'moment'
import { connect } from "react-redux";
import Dinero from '../../node_modules/dinero.js/build/esm/dinero'

class SpendItem extends React.PureComponent {

    _changeSpend(spend){
        this.props.changeSpend(spend)
        NavigationService.navigate("SpendAdd")
    }

    render() {

        return (
            <TouchableOpacity onPress={() => this._changeSpend(this.props.spend)}>
                <View style={styles.line}>
                    <View style={{flex: 0.5}}>
                        <Text style={styles.month}>{moment(new Date(this.props.spend.date)).format('MMM')}</Text>
                        <Text style={styles.day}>{moment(new Date(this.props.spend.date)).format('DD')}</Text>
                    </View>
                    <View style={{flex: 3}}>
                        <Text style={styles.category}>{this.props.spend.category.description}</Text>
                        <Text style={styles.description}>{this.props.spend.description}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={styles.amount}>{Dinero({amount: this.props.spend.value}).toFormat()}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    line: {
        padding: 8,
        margin: 1,
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'white',
        borderBottomColor: 'rgba(204, 204, 204, 0.6)', 
        borderBottomWidth: 0.5
    },
    category: {
        fontSize: 18,
    },
    description: {
        color: '#999',
    },
    amount: {
        fontSize: 16,
        textAlign: 'right'
    },
    month: {
        color: '#999',
        textAlign: 'center',
    },
    day: {
        color: '#999',
        textAlign: 'center',
    }
})

export default connect(
    null, { changeSpend }
)(SpendItem);