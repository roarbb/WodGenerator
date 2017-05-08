import { getRandomInt, getOneRandomFromArray } from './RandomUtils';

export default class Formatter {
    format(item) {
        for (let property in item) {
            if (
                !item.hasOwnProperty(property)
                || typeof item[property] !== 'string'
            ) {
                continue;
            }

            item[property] = item[property].replace(new RegExp(/\[(.*?)\]/, 'g'), (match, p1) => {
                if (
                    item.originalData[p1]
                    && typeof item.originalData[p1] === 'object'
                    && item.originalData[p1].max
                    && item.originalData[p1].min
                ) {
                    let randomNumber = getRandomInt(item.originalData[p1].min, item.originalData[p1].max + 1);
                    this._setNewRandomProperty(item, p1, randomNumber);

                    return randomNumber;
                }

                if (
                    item.originalData[p1]
                    && item.originalData[p1].constructor === Array
                ) {
                    let randomArray = getOneRandomFromArray(item.originalData[p1]);
                    this._setNewRandomProperty(item, p1, randomArray);

                    return randomArray;
                }

                return p1;
            });
        }

        return item;
    }

    prepareWodOutput(workoutType, repetitionScheme, movements, benchmarkWorkout) {
        // console.log('workoutType', workoutType);
        // console.log('repetitionScheme', repetitionScheme);
        // console.log('movements', movements);
        // console.log('benchmarkWorkout', benchmarkWorkout);

        let wod = {};

        if (benchmarkWorkout) {
            wod.name = benchmarkWorkout.name;
            wod.movements = benchmarkWorkout.originalData.movements;
            return wod;
        }

        wod.name = workoutType.name;

        if (workoutType.originalData.note) {
            wod.note = workoutType.originalData.note;
        }

        if (!repetitionScheme) {
            wod.movements = movements.map(movement => {
                let formattedMovement = { "name": movement.name, "reps": movement.reps.min }
                if (movement.weight) {
                    formattedMovement.weight = movement.weight
                }

                return formattedMovement
            })

            return wod;
        }

        wod.movements = repetitionScheme.originalData.reps.map((rep, index) => {
            if (!movements[index]) {
                return { "name": "Rest 1 minute" };
            }

            const movement = movements[index].originalData;
            let formattedMovement = { "name": movements[index].name, "reps": rep }

            if (movement.weight) {
                formattedMovement.weight = movement.weight
            }

            return formattedMovement;
        })

        return wod;
    }

    _setNewRandomProperty(item, key, value) {
        if (!item.random) {
            item.random = {};
        }

        item.random[key] = value;
    }
}