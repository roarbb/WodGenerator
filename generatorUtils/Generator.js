import Database from '../database.json'
import Picker from './Picker'

class Generator {
    constructor() {
        this.throttleInMilliseconds = 0;
        this.picker = new Picker;
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

                console.log('workoutType', workoutType);
                console.log('repetitionScheme', repetitionScheme);
                console.log('movements', movements);
                console.log('benchmarkWorkout', benchmarkWorkout);

                resolve(workoutType);
            }, this.throttleInMilliseconds)
        })
    }
}
9
export default Generator