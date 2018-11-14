import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { ListItem, List, Button, Text } from "react-native-elements";
import { connect } from "react-redux";
import { categoryFetch } from "../actions/CategoryActions";
import NavigationService from "../../NavigationService";
import firebase from "firebase";

const list = [
    {
        key: 'categories',
        title: "Categories",
        icon: "list"
    }
];

class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: "SETTINGS",
        headerStyle: {
            backgroundColor: "#b2dbbf"
        },
        headerRight: (
            <View
                style={{ width: 35, alignContent: "center", marginRight: 20 }}
            />
        )
    };

    _itemClick(option) {
        switch (option) {
            case "categories":
                NavigationService.navigate("Categories");
                break;

            default:
                break;
        }
    }

    _logout() {
        firebase.auth().signOut();
    }

    render() {
        return (
            <View style={styles.contentView}>
                <View>
                    <List>
                        {list.map(item => (
                            <TouchableOpacity key={item.key} onPress={() => this._itemClick(item.key)}>
                                <ListItem
                                    key={item.key}
                                    title={item.title}
                                    leftIcon={{ name: item.icon }}
                                />
                            </TouchableOpacity>
                        ))}
                    </List>
                </View>
                <View style={styles.logoutView} >
                    <Button onPress={() => this._logout()} title="Logout" />
                </View>
            </View>
        );
    }
}

mapStateToProps = state => ({
    categories: state.CategoryListReducer.categories
});

const styles = StyleSheet.create({

    contentView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    logoutView: {
        marginBottom: 50,
    }


});

export default connect(
    mapStateToProps,
    { categoryFetch }
)(SettingsScreen);
