import React from "react";
import { View, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { categoryFetch } from "../actions/CategoryActions";
import NavigationService from "../../NavigationService";
import { changeCategory } from "../actions/SpendActions";

class CategoriesSelectScreen extends React.Component {
    static navigationOptions = {
        headerTintColor: "white",
        title: "Categories",
        headerStyle: {
            backgroundColor: "#457B9D"
        },
        headerRight: (
            <View
                style={{ width: 35, alignContent: "center", marginRight: 20 }}
            />
        )
    };

    componentWillMount() {
        this.props.categoryFetch();
    }

    _selectAndReturn(category_id, category_desc) {
        this.props.changeCategory(category_id, category_desc)
        NavigationService.navigate("SpendAdd")
    }

    render() {
        return (
            <View style={styles.container}>

                {this.props.categories.map(item => (
                    <ListItem
                        key={item.description}
                        title={item.description}
                        hideChevron={true}
                        containerStyle={{ borderBottomColor: 'rgba(204, 204, 204, 0.6)', borderBottomWidth: 0.5 }}
                        onPress={() => this._selectAndReturn(item.id ,item.description)}
                    />
                ))}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: 'white',
    }
})

mapStateToProps = state => ({
    categories: state.CategoryListReducer.categories,
});

export default connect(
    mapStateToProps,
    { categoryFetch, changeCategory }
)(CategoriesSelectScreen);
