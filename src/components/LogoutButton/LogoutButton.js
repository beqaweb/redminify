// @flow

import React from 'react';
import {Button, Icon} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import {withNavigation} from 'react-navigation';
import {Alert} from 'react-native';

class LogoutButton extends React.Component {
    logout = () => {
        Alert.alert(
            'Logout?',
            'Please confirm your action',
            [
                {
                    text: 'Yes', onPress: () => {
                        AsyncStorage.removeItem('authUser');
                        AsyncStorage.removeItem('apiKey');
                        this.props.navigation.navigate('Auth');
                    }
                },
                {
                    text: 'Cancel',
                    onPress: () => undefined,
                    style: 'cancel',
                }
            ],
            {cancelable: false},
        )
    };

    render() {
        return (
            <Button transparent onPress={this.logout}>
                <Icon name='exit'/>
            </Button>
        );
    }
}

export default withNavigation(LogoutButton);
