import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import WodPage from './WodPage'
import { MKButton } from 'react-native-material-kit'

export default class WelcomePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          To generate your WOD simply press the button below. Have fun!
        </Text>
        <TouchableHighlight style={styles.button} underlayColor='#f7d931' onPress={this._onGeneratePress.bind(this)}>
          <Text style={styles.buttonText}>Go</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _onGeneratePress() {
    this.props.navigator.push({
      title: 'WOD',
      component: WodPage,
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4253f4',
    padding: 30,
  },
  welcome: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 50,
    color: '#edeeff',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button: {
    height: 36,
    flexDirection: 'row',
    backgroundColor: '#f7d931',
    borderColor: '#f7d931',
    borderWidth: 1,
    borderRadius: 2,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#4253f4',
    alignSelf: 'center',
  },
});
