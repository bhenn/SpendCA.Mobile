import React from "react";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { gastosFetch, preAddSpend } from "../actions/SpendActions";
import NavigationService from "../../NavigationService";
import SpendItem from "./SpendItem";
import ActionButton from "react-native-action-button";
import CategoryItem from '../components/CategoryItem'

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
        return <CategoryItem category={item.category} sum={item.sum} />;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{flex: 1, paddingTop: 10 }} >
                    <FlatList
                        data={this.props.categories}
                        renderItem={this._renderItemCategory}
                        contentContainerStyle={{ flexDirection: "row" }}
                        keyExtractor={item => item.category}
                    />
                </View>
                <View style={{ flex: 8 }}>
                    <FlatList
                        renderItem={this._renderItem}
                        data={this.props.spends}
                        keyExtractor={item => item.uid}
                    />
                </View>

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
