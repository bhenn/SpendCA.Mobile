import React from "react";
import { View, FlatList, Text, StyleSheet, ActivityIndicator } from "react-native";
import { connect } from "react-redux";
import { spendsFetch, preAddSpend } from "../actions/SpendActions";
import NavigationService from "../../NavigationService";
import SpendItem from "./SpendItem";
import ActionButton from "react-native-action-button";
import CategoryItem from '../components/CategoryItem'

class HomeScreen extends React.Component {
    static navigationOptions = {
        title: "Overview",
        headerTintColor: "white",
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
            location={item.location}
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
        if (this.props.spends_filtered.length == 0 && !this.props.isLoading) {
            noSpendMessage = <View style={styles.noSpendMessage} ><Text>You don't have any spends</Text></View>
        }

        return (
            <View style={styles.container}>
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#457B9D" animating={this.props.isLoading} />
                </View>
                <View style={{ flex: 1, padding: 10, borderBottomColor: 'rgba(204, 204, 204, 0.6)', borderBottomWidth: 2 }} >
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
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    noSpendMessage: {
        paddingTop: 30,
        alignItems: 'center'
    },
    loading: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
})

mapStateToProps = state => ({
    filter_category: state.SpendListReducer.filter_category,
    spends_filtered: state.SpendListReducer.spends_filtered,
    categories: state.SpendListReducer.categories,
    isLoading: state.SpendListReducer.isLoading,
});

export default connect(
    mapStateToProps,
    { spendsFetch, preAddSpend }
)(HomeScreen);
