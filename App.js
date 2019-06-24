/**
 * @format
 * @flow
 */

import React from "react";
import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import LoginScreen from "./src/screens/LoginScreen";
import ProjectsScreen from "./src/screens/ProjectsScreen";
import ProjectScreen from "./src/screens/ProjectScreen";
import AuthLoading from "./src/screens/AuthLoadingScreen";
import {Provider} from "react-redux";
import store from './src/redux';

const AppStack = createStackNavigator({
    Projects: ProjectsScreen,
    Project: ProjectScreen,
});

const AuthStack = createStackNavigator({
    Login: LoginScreen
});

const AppContainer = createAppContainer(createSwitchNavigator(
    {
        AuthLoading,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        );
    }
}
