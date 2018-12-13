import React from "react";
import { View, StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { categoryFetch } from "../actions/CategoryActions";
import NavigationService from "../../NavigationService";
import ActionButton from "react-native-action-button";

class CategoriesScreen extends React.Component {
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

    render() {
        return (
            <View style={styles.container}>

                {this.props.categories.map(item => (
                    <ListItem
                        key={item.description}
                        title={item.description}
                        hideChevron={true}
                    />
                ))}

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

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 20,
    }
})

mapStateToProps = state => ({
    categories: state.CategoryListReducer.categories
});

export default connect(
    mapStateToProps,
    { categoryFetch }
)(CategoriesScreen);
