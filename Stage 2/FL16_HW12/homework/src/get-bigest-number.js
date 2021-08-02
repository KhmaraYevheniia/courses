const getBigestNumber = (...args) => {

    if (args.length < 2) {
        throw Error('Not enough arguments');
    } else if (args.length > 10) {
        throw Error('Too many arguments');
    }

    const checkType = Object.values(args).filter(el => typeof el !== 'number');
    if (checkType.length) {
        throw Error('Wrong argument type');
    }
    return Math.max(...args);

}

module.exports = getBigestNumber;