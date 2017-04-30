import Database from './database.json'

class Generator {
    constructor() {
        this.throttleInMilliseconds = 1456;
    }

    generateWod() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // const repetitionScheme = this._getRandomRepScheme(Database.repetition_schemes)
                // resolve(`Repetition scheme: `);
                resolve(`5 rounds for time: 100 Double unders, 10 burpees`);
            }, this.throttleInMilliseconds)
        })
    }

    _getRandomRepScheme(schemes) {
        schemeChances = [];

        // TODO: needs to be synchronous (Generator functions/Promises)
        schemes.forEach((scheme) => {
            let counter = schemeChances.length + 1;
            if (counter === 1) {
                const min = 0;
                const max = 100 * scheme.chance;
            } else {
                const lastElement = schemeChances[schemeChances.length - 1];
                const min = lastElement.max + 1;
                const max = lastElement.min + 100 * scheme.chance;
            }
            schemeChance = { "name": scheme.name, "min": min, "max": max };
            schemeChances.push(schemeChance);
        })

        console.log("Scheme chances: ", schemeChances);
    }

    /**
     * returns a random integer between the specified values. The value is no lower than min 
     * (or the next integer greater than min if min isn't an integer), 
     * and is less than (but not equal to) max
     */
    _getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

export default Generator