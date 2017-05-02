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