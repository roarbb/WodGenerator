import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS
} from 'react-native';
import WelcomePage from './WelcomePage'

export default class WodGenerator extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Wod Generator',
          component: WelcomePage,
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

AppRegistry.registerComponent('WodGenerator', () => WodGenerator);
