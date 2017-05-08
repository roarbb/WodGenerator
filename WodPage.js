import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator
} from 'react-native';
import Generator from './generatorUtils/Generator'

export default class WodPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            wod: 0,
        }
        this.generator = new Generator
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
        let generatedWod = <Text style={styles.welcome}>Something's wrong, please try again.</Text>

        if (this.state.wod) {
            generatedWod = <View style={styles.container}>
                <Text style={styles.description}>
                    {this.state.wod.name}
                </Text>
                {this._renderMovements(this.state.wod.movements)}
            </View>
        }

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

    _renderMovements(movements) {
        return (
            movements.map((movement, index) => <Text key={index} style={styles.welcome}>
                {movement.reps && `${movement.reps} x`} {movement.name}
                {movement.weight &&
                    <Text> @ M: {movement.weight.male}kg / F: {movement.weight.female}kg</Text>
                }
            </Text>)
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#4253f4',
        padding: 10,
    },
    welcome: {
        fontSize: 18,
        textAlign: 'center',
        // margin: 10,
        color: '#edeeff',
    },
    description: {
        fontSize: 25,
        textAlign: 'center',
        color: '#b163b2',
    },
});