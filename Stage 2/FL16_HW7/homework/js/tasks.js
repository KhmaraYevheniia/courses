const getMaxEvenElement = arr => {
    return arr.reduce((acc, cur) => cur % 2 === 0 ? Math.max(acc, cur) : acc)
}

let a = 3;
let b = 5;
[a, b] = [b, a]

const getValue = value => {
    return value ?? '-';
}

const arrayOfArray = [
    ['name', 'dan'],
    ['age', '21'],
    ['city', 'Lviv']
]

const getObjFromArray = arr => Object.fromEntries(new Map(arr))

const obj = {
    name: 'nick'
}

const addUniqueId = obj => {
    return Object.assign({ id: Symbol() }, obj);
}

const oldObj = {
    name: 'willow',
    details: { id: 1, age: 47, university: 'LNU' }
}

const getRegroupedObject = obj => {
    const {
        name: firstName,
        details: { age, university, id }
    } = obj;
    const user = { age, firstName, id };
    return { university, user }
}

const arr = [2, 3, 4, 2, 4, 'a', 'c', 'a'];

const getArrayWithUniqueElement = arr => {
    return [...new Set(arr)];
}

const phoneNumber = '0123456789';

const hideNumber = phone => {
    return phone.slice(-4).padStart(phone.length, '*');
}

const required = (param) => {
    throw new Error(param + ' is required');
}

const add = (a = required('a'), b = required('b')) => {
    return a + b;
}

function* generateIterableSequence(...args) {
    for (let value of args) {
        yield value;
    }
}

const generatorObject = generateIterableSequence('I', 'love', 'Kharkiv');

for (let value of generatorObject) {
    console.log(value);
}