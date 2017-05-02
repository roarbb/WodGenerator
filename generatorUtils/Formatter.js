import { getRandomInt, getRandomFromArray } from './RandomUtils';

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
                    let randomArray = getRandomFromArray(item.originalData[p1]);
                    this._setNewRandomProperty(item, p1, randomArray);

                    return randomArray;
                }

                return p1;
            });
        }

        return item;
    }

    _setNewRandomProperty(item, key, value) {
        if (!item.random) {
            item.random = {};
        }

        item.random[key] = value;
    }
}