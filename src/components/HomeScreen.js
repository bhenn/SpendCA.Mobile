import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { spendsFetch, preAddSpend } from "../actions/SpendActions";
import NavigationService from "../../NavigationService";
import SpendItem from "./SpendItem";
import ActionButton from "react-native-action-button";
import CategoryItem from '../components/CategoryItem'

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: "Overview",
        headerStyle: {
            backgroundColor: "#457B9D"
        }
    };

    componentWillMount() {
        this.props.spendsFetch();
    }

    _renderItem = ({ item }) => (
        <SpendItem
            description={item.description}
            category={item.category}
            value={item.value}
            date={item.date}
            uid={item.uid}
        />
    )


    _renderItemCategory = ({ item }) => (
        <CategoryItem category={item.category} sum={item.sum} selected={item.category == this.props.filter_category} />
    )

    render() {
        let noSpendMessage = undefined
        if (this.props.spends_filtered.length == 0) {
            noSpendMessage = <View style={styles.noSpendMessage} ><Text>You don't have any spends</Text></View>
        }

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, padding: 10 }} >
                    {noSpendMessage}
                    <FlatList
                        data={this.props.categories}
                        extraData={this.props}
                        renderItem={this._renderItemCategory}   
                        keyExtractor={item => item.category}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={{ flex: 8 }}>
                    <FlatList
                        renderItem={this._renderItem}
                        data={this.props.spends_filtered}
                        keyExtractor={item => item.uid}
                    />
                </View>
                <ActionButton
                    buttonColor="#f96872"
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

const styles = StyleSheet.create({
    noSpendMessage: {
        paddingTop: 30,
        alignItems: 'center'
    }
})

mapStateToProps = state => ({
    filter_category: state.SpendListReducer.filter_category,
    spends_filtered: state.SpendListReducer.spends_filtered,
    categories: state.SpendListReducer.categories,
});

export default connect(
    mapStateToProps,
    { spendsFetch, preAddSpend }
)(HomeScreen);
