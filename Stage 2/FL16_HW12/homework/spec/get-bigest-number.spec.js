const getBigestNumber = require('../src/get-bigest-number');

describe('getBigestNumber function', () => {

    it('should throw an error for wrong argument type', () => {
        expect(() => {
            getBigestNumber(1, '2')
        }).toThrowError('Wrong argument type');
    });

    it('shold be more arguments"', () => {
        expect(() => {
            getBigestNumber(1)
        }).toThrowError('Not enough arguments');
    });

    it('shold throw an error for too many arguments', () => {
        expect(() => {
            getBigestNumber(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11)
        }).toThrowError('Too many arguments');
    });

    it('shold return max argument', () => {
        expect(getBigestNumber(1, 2, 3, 4)).toBe(4);
    });
})