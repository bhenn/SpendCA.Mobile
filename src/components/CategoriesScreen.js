import React from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Icon, ListItem, List } from "react-native-elements";
import { connect } from "react-redux";
import { categoryFetch } from "../actions/CategoryActions";
import NavigationService from "../../NavigationService";

class CategoriesScreen extends React.Component {
    static navigationOptions = {
        headerTintColor: "black",
        title: "CATEGORIES",
        headerStyle: {
            backgroundColor: "#b2dbbf"
        },
        headerRight: (
            <View
                style={{ width: 35, alignContent: "center", marginRight: 20 }}
            >
                <TouchableOpacity
                    onPress={() => NavigationService.navigate("CategoryAdd")}
                >
                    <Icon name="add" fontSize="20" style={{ marginRight: 5 }} />
                </TouchableOpacity>
            </View>
        )
    };

    componentWillMount() {
        this.props.categoryFetch();
    }

    render() {
        return (
            <View>
                <List>
                    {this.props.categories.map(item => (
                        <ListItem
                            key={item.description}
                            title={item.description}
                            hideChevron={true}
                        />
                    ))}
                </List>
            </View>
        );
    }
}

mapStateToProps = state => ({
    categories: state.CategoryListReducer.categories
});

export default connect(
    mapStateToProps,
    { categoryFetch }
)(CategoriesScreen);
