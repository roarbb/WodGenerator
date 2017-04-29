import Database from './database.json'

class Generator {
    constructor() {
        this.throttleInMilliseconds = 1476;
    }

    generateWod() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(`${Math.random() * 2000 + 1000} ${Database.name}`);
            }, this.throttleInMilliseconds)
        })
    }
}

export default Generator