import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

export default class Menu extends Component {
  render() {
    return [
      <Text style={styles.welcome}>中文打字遊戲</Text>,
      <Button title="平常模式" color="green"
        onPress={this.props.handleNormalClick}/>,
      <Button title="暗記模式" color="black"
        onPress={this.props.handleHardClick}/>,
      <Button title="登出" color="red" />
    ];
  }
}

const styles = {
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
};
