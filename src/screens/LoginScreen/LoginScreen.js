// @flow

import React from 'react';
import {StyleSheet, View} from 'react-native';
import LoginForm from "../../forms/LoginForm";
import AsyncStorage from '@react-native-community/async-storage';
import {SubmissionError} from 'redux-form';
import {fetchCurrentUser} from "../../redux/actions/auth";
import {connect} from 'react-redux';
import {setRedmineApiKey} from "../../api/RedmineApi";

class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Please sign in'
    };

    doLogin = (values) => {
        return this.props.fetchCurrentUser(values.username, values.password)
            .then(
                (user) => {
                    setRedmineApiKey(user.api_key);
                    Promise.all([
                        AsyncStorage.setItem('authUser', JSON.stringify(user)),
                        AsyncStorage.setItem('apiKey', user.api_key),
                    ])
                        .then(() => {
                            this.props.navigation.navigate('App');
                        });
                },
                (error) => {
                    console.log(error);
                    console.log(error.response);
                    throw new SubmissionError({
                        _error: 'Failed to login'
                    });
                }
            );
    };

    render() {
        return (
            <View style={styles.container}>
                <LoginForm
                    onSubmit={this.doLogin}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default connect(null, {
    fetchCurrentUser
})(LoginScreen);
