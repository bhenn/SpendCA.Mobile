import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { ListItem, Button } from "react-native-elements";
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
        title: "Settings",
        headerTintColor: "white",
        headerStyle: {
            backgroundColor: "#457B9D"
        },
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
                <View style={styles.listView}>
                    {list.map(item => (
                        <TouchableOpacity key={item.key} onPress={() => this._itemClick(item.key)}>
                            <ListItem
                                key={item.key}
                                title={item.title}
                                leftIcon={{ name: item.icon }}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                <View style={styles.logoutView} >
                    <Button
                        onPress={() => this._logout()} title="Logout"
                        buttonStyle={{ backgroundColor: '#E63946' }}
                    />
                </View>
            </View>
        );
    }
}

mapStateToProps = state => ({
    categories: state.CategoryListReducer.categories
});

const styles = StyleSheet.create({
    listView: {
        paddingTop: 20
    },
    contentView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    logoutView: {
        marginBottom: 50,
        padding: 20
    }


});

export default connect(
    mapStateToProps,
    { categoryFetch }
)(SettingsScreen);
