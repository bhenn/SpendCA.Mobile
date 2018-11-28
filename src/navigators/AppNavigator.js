import React, { Component } from "react";
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from "../components/HomeScreen";
import SpendAddScreen from "../components/SpendAddScreen";
import NewUserScreen from "../components/NewUserScreen";
import loginScreen from '../components/LoginScreen';
import AuthLoadingScreen from "../components/AuthLoadingScreen";
import NavigationService from "../../NavigationService";
import CategoriesScreen from "../components/CategoriesScreen";
import CategoryAddScreen from "../components/CategoryAddScreen";
import SettingsScreen from '../components/SettingsScreen';

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    SpendAdd: SpendAddScreen
})

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
    Categories: CategoriesScreen,
    CategoryAdd: CategoryAddScreen,
})

const AuthStack = createStackNavigator({
    Login: loginScreen,
    NewAccount: NewUserScreen
})

const TabNavigator = createBottomTabNavigator({
    Home: HomeStack,
    Settings: SettingsStack,
},
{
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Home') {
                iconName = 'ios-basket';
            } else if (routeName === 'Settings') {
                iconName = 'ios-options';
            }

            return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
        
    }),
    tabBarOptions: {
        activeTintColor: '#f96872',
        inactiveTintColor: 'gray',
    },
})

const RootNavigator = createSwitchNavigator(
    {
    AuthLoading: AuthLoadingScreen,
    App: TabNavigator,
    Auth: AuthStack    
    },
    {
        initialRouteName: 'AuthLoading',
    }
)

class Nav extends Component {
    render() {
        return (
            <RootNavigator ref={navigatorRef => { NavigationService.setTopLevelNavigator(navigatorRef) }}/>
        )
    }
}

export default Nav
