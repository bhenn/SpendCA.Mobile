import React from "react";
import {
    View,
    FlatList,
    Text,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { gastosFetch, preAddSpend } from "../actions/SpendActions";
import NavigationService from "../../NavigationService";
import SpendItem from "./SpendItem";
import ActionButton from "react-native-action-button";

class MyListItemCategory extends React.PureComponent {
    render() {
        return (
            <TouchableOpacity>
                <View
                    style={{
                        backgroundColor: "white",
                        width: 70,
                        height: 70,
                        margin: 3,
                        padding: 4
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <Text>{this.props.category}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text>{this.props.sum}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: "Overview",
        headerStyle: {
            backgroundColor: "#b2dbbf"
        }
    };

    componentWillMount() {
        this.props.gastosFetch();
    }

    _renderItem({ item }) {
        return (
            <SpendItem
                description={item.description}
                category={item.category}
                value={item.value}
                date={item.date}
                uid={item.uid}
            />
        );
    }

    _renderItemCategory({ item }) {
        return <MyListItemCategory category={item.category} sum={item.sum} />;
    }

    render() {
        return (
            <View style={styles.contentView}>
                <View>
                    <FlatList
                        data={this.props.categories}
                        renderItem={this._renderItemCategory}
                        contentContainerStyle={{ flexDirection: "row" }}
                        keyExtractor={item => item.category}
                    />

                    <FlatList
                        renderItem={this._renderItem}
                        data={this.props.spends}
                        keyExtractor={item => item.uid}
                    />
                </View>
                <View style={styles.addButtonView}>
                    <ActionButton
                        buttonColor="#b2dbbf"
                        onPress={() => {
                            this.props.preAddSpend();
                            NavigationService.navigate("SpendAdd");
                        }}
                    />
                </View>
            </View>
        );
    }
}

mapStateToProps = state => ({
    spends: state.SpendListReducer.spends,
    categories: state.SpendListReducer.categories
});

const styles = StyleSheet.create({
    contentView: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    addButtonView: {
        marginBottom: 120
    }
});

export default connect(
    mapStateToProps,
    { gastosFetch, preAddSpend }
)(HomeScreen);
