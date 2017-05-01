import Database from '../database.json'
import Formatter from './Formatter'
import { getRandomInt } from './RandomUtils'

class Generator {
    constructor() {
        this.throttleInMilliseconds = 1456;
        this.formatter = new Formatter;
    }

    generateWod() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const repetitionScheme = this._getRandomRepScheme(Database.repetition_schemes)
                resolve(repetitionScheme);
            }, this.throttleInMilliseconds)
        })
    }

    _getRandomRepScheme(schemes) {
        const schemesWithChanceRange = this._getSchemesWithChanceRange(schemes);
        const randomNumber = getRandomInt(0, this.total+1);

        const randomSchema = schemesWithChanceRange.filter(
            this._randomNumberIsInSchemaRange.bind(this, randomNumber)
        );

        if (!randomSchema[0]) {
            return false;
        }

        return this.formatter.format(randomSchema[0]);
    }

    _getSchemesWithChanceRange(schemes) {
        this.total = 0;

        return schemes.map((scheme) => {
            let chance = scheme.chance || 1;
            let min = 0;
            let max = 100 * chance;

            if (this.total > 0) {
                min = this.total + 1;
                max = min + (100 * chance);
            }

            this.total = max;

            return { "name": scheme.name, "min": min, "max": max, "originalScheme": scheme };
        });

        return schemesWithChanceRange;
    }

    _randomNumberIsInSchemaRange(randomNumber, schema) {
        return randomNumber <= schema.max && randomNumber >= schema.min
    }
}

export default Generator