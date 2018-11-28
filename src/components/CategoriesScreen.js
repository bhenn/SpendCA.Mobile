import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Icon, ListItem, List } from "react-native-elements";
import { connect } from "react-redux";
import { categoryFetch } from "../actions/CategoryActions";
import NavigationService from "../../NavigationService";
import ActionButton from "react-native-action-button";

class CategoriesScreen extends React.Component {
    static navigationOptions = {
        headerTintColor: "black",
        title: "CATEGORIES",
        headerStyle: {
            backgroundColor: "#f96872"
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

    render() {
        return (
            <View style={{ flex: 1 }}>
                <List>
                    {this.props.categories.map(item => (
                        <ListItem
                            key={item.description}
                            title={item.description}
                            hideChevron={true}
                        />
                    ))}
                </List>
                <ActionButton
                    buttonColor="#f96872"
                    offsetX={30}
                    offsetY={30}
                    onPress={() => {
                        NavigationService.navigate("CategoryAdd");
                    }}
                />
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
