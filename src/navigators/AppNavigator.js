import React, { Component } from "react";
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Icon } from "react-native-elements";

import HomeScreen from "../components/HomeScreen";
import SpendAddScreen from "../components/SpendAddScreen";
import NewUserScreen from "../components/NewUserScreen";
import loginScreen from '../components/LoginScreen';
import AuthLoadingScreen from "../components/AuthLoadingScreen";
import NavigationService from "../../NavigationService";
import CategoriesScreen from "../components/CategoriesScreen";
import CategoryAddScreen from "../components/CategoryAddScreen";
import SettingsScreen from '../components/SettingsScreen';
import CategoriesSelectScreen from "../components/CategorySelectScreen";
import { createNativeWrapper } from "react-native-gesture-handler";

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    SpendAdd: SpendAddScreen,
    CategorySelect: CategoriesSelectScreen
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
        Home: {
            screen: HomeStack,
            navigationOptions: {
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor }) => (
                    <Ionicons name='ios-basket' color={tintColor} size={25}/>
                )
            }
        },
        Settings: {
            screen: SettingsStack,
            navigationOptions: {
                tabBarLabel: 'Settings',
                tabBarIcon: ({ tintColor }) => (
                    <Ionicons name='ios-options' color={tintColor} size={25}/>
                )
            }
        }
    },{
        tabBarOptions: {
            activeTintColor: '#457B9D',
            inactiveTintColor: 'gray'
        }

    }

)


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

const AppContainer = createAppContainer(RootNavigator);

class Nav extends Component {
    render() {
        return (
            // <RootNavigator ref={navigatorRef => { NavigationService.setTopLevelNavigator(navigatorRef) }} />
            <AppContainer ref={navigatorRef => { NavigationService.setTopLevelNavigator(navigatorRef ) }}></AppContainer>
        )
    }
}

export default Nav
