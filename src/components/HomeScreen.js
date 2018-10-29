import React from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
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

                <ActionButton
                    buttonColor="#b2dbbf"
                    offsetX={30}
                    offsetY={30}
                    onPress={() => {
                        this.props.preAddSpend();
                        NavigationService.navigate("SpendAdd");
                    }}
                />
            </View>
        );
    }
}

mapStateToProps = state => ({
    spends: state.SpendListReducer.spends,
    categories: state.SpendListReducer.categories
});

export default connect(
    mapStateToProps,
    { gastosFetch, preAddSpend }
)(HomeScreen);
