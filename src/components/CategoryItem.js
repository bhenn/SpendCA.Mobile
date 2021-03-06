import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { filterSpends } from "../actions/SpendActions";
import { connect } from "react-redux";
import Dinero from '../../node_modules/dinero.js/build/esm/dinero'

class CategoryItem extends React.PureComponent {

    _filterSpends(filterText){
        this.props.filterSpends(filterText)
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this._filterSpends(this.props.category)}>
                <View
                    style={[styles.container , this.props.selected && styles.category_selected]}
                >
                    <View style={{ flex: 1 }}>
                        <Text>{this.props.category}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text>{Dinero({ amount: this.props.sum }).toFormat()}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: 85,
        height: 70,
        // margin: 3,
        padding: 4,
        alignItems: 'center',
        borderRightColor: 'rgba(204, 204, 204, 0.6)', 
        borderRightWidth: 0.5
    },
    category_selected: {
        backgroundColor: '#e2e2e2'
    }
})

export default connect(
    null, { filterSpends }
)(CategoryItem);