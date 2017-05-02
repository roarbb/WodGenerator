import Database from '../database.json'
import Picker from './Picker'

class Generator {
    constructor() {
        this.throttleInMilliseconds = 1456;
        this.picker = new Picker;
    }

    generateWod() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const repetitionScheme = this.picker.pickOneRandom(Database.workout_types);
                console.log('repetitionScheme', repetitionScheme)
                resolve(repetitionScheme);
            }, this.throttleInMilliseconds)
        })
    }
}

export default Generator