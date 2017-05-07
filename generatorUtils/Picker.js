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
        console.log('movements', movements);
        console.log('workoutType', workoutType);
        console.log('repetitionScheme', repetitionScheme);

        if (!repetitionScheme && workoutType.random && workoutType.random.movements) {
            return this._getMovementsWithWeight(workoutType.random.movements, movements);
        }

        return [];
    }

    _getMovementsWithWeight(count, movements) {
        const pickedMovements = this._getUniqueMovements(movements, count);

        console.log('picked movements: ', pickedMovements);
    }

    _getUniqueMovements(movements, count) {

        let out = [];

        for (let i = 0; i < count; i++) {
            const movementsDataset = this._getdatasetWithChanceRange(movements);
            const randomNumber = getRandomInt(0, this.total + 1);

            movementsDataset.forEach((element, index, array) => {
                if(this._randomNumberIsInSchemaRange(randomNumber, element)) {
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