import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator
} from 'react-native';
import Generator from './Generator'

export default class WodPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            wod: 0,
        }
        this.generator = new Generator
    }

    componentWillUnmount() {
        // clearTimeout(this.timeoutPointer);
    }

    componentDidMount() {
        this.generator.generateWod()
        .then(wod => {
            this.setState({
                isLoading: false,
                wod: wod,
            })
        })
        .catch(error => console.log(error))
    }

    render() {
        const generatedWod = <View style={styles.container}>
            <Text style={styles.welcome}>
                {this.state.wod}
            </Text>
        </View>

        const spinner = <View style={styles.container}>
            <Text style={styles.welcome}>Generating your WOD</Text>
            <ActivityIndicator size="large" />
        </View>

        const content = this.state.isLoading ?
            (spinner) : (generatedWod);

        return (
            <View style={styles.container}>
                {content}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4253f4',
        padding: 10,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        marginTop: 50,
        color: '#edeeff',
    },
});