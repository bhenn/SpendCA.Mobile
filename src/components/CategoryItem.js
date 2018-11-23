import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { changeSpend } from "../actions/SpendActions";
import { connect } from "react-redux";
import Dinero from '../../node_modules/dinero.js/build/esm/dinero'

class CategoryItem extends React.PureComponent {

    render() {
        return (
            <TouchableOpacity>
                <View
                    style={styles.container}
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
        backgroundColor: "white",
        width: 70,
        height: 70,
        margin: 3,
        padding: 4
    }
})

export default connect(
    null, { changeSpend }
)(CategoryItem);