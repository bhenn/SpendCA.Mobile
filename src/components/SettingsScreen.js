import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { ListItem, Icon } from "react-native-elements";
import { connect } from "react-redux";
import { categoryFetch } from "../actions/CategoryActions";
import { doLogout } from '../actions/UserActions'
import NavigationService from "../../NavigationService";

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
        this.props.doLogout();
        NavigationService.navigate("Login");
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
                    <TouchableOpacity key={'logout'} onPress={() => this._logout()}>
                        <ListItem
                            key={'logout'}
                            title={'Logout'}
                            leftIcon={
                                <Icon
                                    type='feather'
                                    name='power'
                                />
                            }
                        />
                    </TouchableOpacity>
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
        paddingBottom: 40
    }


});

export default connect(
    mapStateToProps,
    { categoryFetch, doLogout }
)(SettingsScreen);
