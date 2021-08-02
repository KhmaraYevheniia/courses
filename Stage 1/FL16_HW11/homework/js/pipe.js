function isFunction(functionToCheck) {
	return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

const pipe = (value, ...funcs) => {
	try {
		return funcs.reduce((acc, func, index) => {
			if (!isFunction(func)) {
				throw index;
			}
			return func(acc);
		}, value);
	} catch (errorIndex) {
		return `Provided argument at position ${errorIndex} is not a function!`;
	}
}

const replaceUnderscoreWithSpace = (value) => value.replace(/_/g, ' ');
const capitalize = (value) =>
	value
		.split(' ')
		.map((val) => val.charAt(0).toUpperCase() + val.slice(1))
		.join(' ');

const appendGreeting = (value) => `Hello, ${value}!`;

const error = pipe('john_doe', replaceUnderscoreWithSpace, capitalize, '');

alert(error);

const result = pipe('john_doe', replaceUnderscoreWithSpace, capitalize, appendGreeting);

alert(result);
