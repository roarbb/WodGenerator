import Database from '../database.json'
import Picker from './Picker'
import Formatter from './Formatter'

class Generator {
    constructor() {
        this.throttleInMilliseconds = 0;
        this.picker = new Picker;
        this.formatter = new Formatter;
    }

    generateWod() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const workoutType = this.picker.pickOneRandom(Database.workout_types),
                    databaseMovements = [...Database.movements],
                    databaseRepetitionSchemes = [...Database.repetition_schemes],
                    databaseGirls = [...Database.girls];

                let repetitionScheme,
                    benchmarkWorkout,
                    movements = [];

                if (workoutType.originalData.next === 'repetition_schemes') {
                    repetitionScheme = this.picker.pickOneRandom(databaseRepetitionSchemes);
                    movements = this.picker.pickMovementsForRepetitionScheme(repetitionScheme, databaseMovements);
                }

                if (workoutType.originalData.next === 'girls') {
                    benchmarkWorkout = this.picker.pickOneRandom(databaseGirls);
                }

                if (workoutType.originalData.next === 'movements') {
                    movements = this.picker.pickRandomMovements(databaseMovements, workoutType, repetitionScheme);
                }

                resolve(
                    this.formatter.prepareWodOutput(workoutType, repetitionScheme, movements, benchmarkWorkout)
                );
            }, this.throttleInMilliseconds)
        })
    }
}

export default Generator