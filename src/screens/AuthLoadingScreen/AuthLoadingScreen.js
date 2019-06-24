// @flow

import React from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, View,} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {setRedmineApiKey} from "../../api/RedmineApi";
import {setUser} from "../../redux/actions/auth";
import {connect} from 'react-redux';

class AuthLoadingScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        this._bootstrapAsync()
            .then(
                user => {
                    this.props.navigation.navigate(!!user ? 'App' : 'Auth');
                },
                () => {
                    this.props.navigation.navigate('Auth');
                }
            );
    }

    _bootstrapAsync = async () => {
        const user = JSON.parse(await AsyncStorage.getItem('authUser'));
        const apiKey = await AsyncStorage.getItem('apiKey');
        return new Promise((resolve) => {
            setRedmineApiKey(apiKey);
            this.props.setUser(user);
            resolve(user);
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default connect(null, {
    setUser
})(AuthLoadingScreen);
