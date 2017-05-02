/**
 * returns a random integer between the specified values. The value is no lower than min 
 * (or the next integer greater than min if min isn't an integer), 
 * and is less than (but not equal to) max
 */
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

export function getRandomFromArray(items) {
    return items[getRandomInt(0, items.length)];
}