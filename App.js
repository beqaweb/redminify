/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Login from "./src/Screens/Login/Login";


export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Login/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
