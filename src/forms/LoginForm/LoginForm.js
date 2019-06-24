// @flow

import React from 'react';
import {Field, reduxForm} from 'redux-form';
import {Button, ScrollView, StyleSheet} from 'react-native';
import {Container, Form, Input, Item, Label, Text} from 'native-base';

const TextField = ({input, inputProps, label, meta: {touched, error}}) => (
    <Item floatingLabel>
        <Label>{label}</Label>
        <Input
            {...input}
            error={(touched && error) && error}
            {...inputProps}
        />
    </Item>
);

const validate = ({username, password}) => {
    const errors = {};

    if (!username) {
        errors.username = 'Required';
    }
    if (!password) {
        errors.password = 'Required';
    }

    return errors;
};

class LoginForm extends React.Component {
    render() {
        const {error, invalid, pristine, submitting, handleSubmit} = this.props;

        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Container>
                    <Form>
                        <Field
                            name='username'
                            label='Username'
                            inputProps={{
                                autoCapitalize: 'none'
                            }}
                            component={TextField}
                        />
                        <Field
                            name='password'
                            label='Password'
                            inputProps={{
                                last: true,
                                secureTextEntry: true,
                                autoCapitalize: 'none'
                            }}
                            component={TextField}
                        />
                    </Form>

                    {error && <Text style={styles.errorText}>{error}</Text>}

                    <Button
                        onPress={handleSubmit}
                        disabled={invalid || pristine || submitting}
                        title="Login"
                    />
                </Container>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    errorText: {
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        color: 'red'
    }
});

export default reduxForm({
    form: 'LoginForm',
    validate
})(LoginForm);
