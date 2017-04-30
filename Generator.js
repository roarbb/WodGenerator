import Database from './database.json'

class Generator {
    constructor() {
        this.throttleInMilliseconds = 1456;
    }

    generateWod() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const repetitionScheme = this._getRandomRepScheme(Database.repetition_schemes)
                resolve(`Selected Repetition scheme: ${repetitionScheme.name}`);
            }, this.throttleInMilliseconds)
        })
    }

    _getRandomRepScheme(schemes) {
        let total = 0;

        const newSchemes = schemes.map((scheme) => {
            let min = 0;
            let max = 100 * scheme.chance;

            if (total > 0) {
                min = total + 1;
                max = min + (100 * scheme.chance);
            }

            total = max;

            return { "name": scheme.name, "min": min, "max": max };
        });

        randomNumber = this._getRandomInt(0, total);
        // console.log('newSchemes', newSchemes);
        console.log('randomNumber', randomNumber);

        randomScheme = newSchemes.filter((scheme) => {
            return randomNumber <= scheme.max && randomNumber >= scheme.min
        })

        console.log('randomScheme', randomScheme[0]);
        return randomScheme[0];
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