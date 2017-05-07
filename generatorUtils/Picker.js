import Formatter from './Formatter'
import { getRandomInt } from './RandomUtils'

export default class Picker {
    constructor() {
        this.formatter = new Formatter;
    }

    pickOneRandom(dataset) {
        const datasetWithChanceRange = this._getdatasetWithChanceRange(dataset);
        const randomNumber = getRandomInt(0, this.total + 1);

        const randomDataset = datasetWithChanceRange.filter(
            this._randomNumberIsInSchemaRange.bind(this, randomNumber)
        );

        if (!randomDataset[0]) {
            return false;
        }

        return this.formatter.format(randomDataset[0]);
    }

    pickRandomMovements(movements, workoutType, repetitionScheme) {
        if (!repetitionScheme && workoutType.random && workoutType.random.movements) {
            return this._getMovementsWithWeight(movements, workoutType.random.movements);
        }

        return [];
    }

    pickMovementsForRepetitionScheme(repetitionScheme, movements) {
        if (repetitionScheme.movements) {
            console.log('------- have movements -------------')
        } else {
            console.log('---------- don have movements');
        }

        return [];
    }

    _getMovementsWithWeight(movements, count) {
        return this._getUniqueMovements(movements, count);
    }

    _getUniqueMovements(movements, count) {
        let out = [];

        for (let i = 0; i < count; i++) {
            const movementsDataset = this._getdatasetWithChanceRange(movements);
            const randomNumber = getRandomInt(0, this.total + 1);

            movementsDataset.forEach((element, index, array) => {
                if (this._randomNumberIsInSchemaRange(randomNumber, element)) {
                    out.push(movements.splice(index, 1)[0]);
                }
            });
        }

        return out;
    }

    _getdatasetWithChanceRange(dataset) {
        this.total = 0;

        return dataset.map((data) => {
            let chance = data.chance || 1;
            let min = 0;
            let max = 100 * chance;

            if (this.total > 0) {
                min = this.total + 1;
                max = min + (100 * chance);
            }

            this.total = max;

            return { "name": data.name, "min": min, "max": max, "originalData": data };
        });

        return datasetWithChanceRange;
    }

    _randomNumberIsInSchemaRange(randomNumber, schema) {
        return randomNumber <= schema.max && randomNumber >= schema.min
    }
}