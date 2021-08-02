const isEquals = (value1, value2) => {
    return value1 === value2;
}

const isBigger = (value1, value2) => {
    return value1 > value2;
}

const storeNames = (...args) => {
    return args;
}

const getDifference = (value1, value2) => {
    return value1 > value2 ? value1 - value2 : value2 - value1;
}

const negativeCount = (arr) => {
    return arr.filter(el => el < 0).length;
}

const letterCount = (str, symbol) => {
    return str.split(symbol).length - 1;
}

const countPoints = arr => {
    let result = 0;
    arr.forEach((el) => {
        let x = +el.slice(0, el.indexOf(':'));
        let y = +el.slice(el.indexOf(':') + 1);

        if (x > y) {
            result += 3;
        } else if (x === y) {
            result += 1;
        }
    });

    return result;
}