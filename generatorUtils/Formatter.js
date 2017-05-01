import { getRandomInt } from './RandomUtils';

export default class Formatter {
    format(item) {
        for (let property in item) {
            if (
                !item.hasOwnProperty(property)
                || typeof item[property] !== 'string'
            ) {
                continue;
            }

            item[property] = item[property].replace(/\[(.*?)\]/, (match, p1, offset, string) => {
                if (
                    typeof item.originalScheme[p1] === 'object'
                    && item.originalScheme[p1].max
                    && item.originalScheme[p1].min
                ) {
                    return getRandomInt(item.originalScheme[p1].min, item.originalScheme[p1].max + 1);
                }

                return p1;
            });
        }

        return item;
    }
}