const BirthdayService = require('../src/birthday.service');

describe('class BirthdayService', () => {

    let myDate;

    beforeEach(function () {
        myDate = new BirthdayService();
    });

    it('should exsists class BirthdayService', () => {
        expect(myDate).toBeDefined();
    });

    it('should to be object', () => {
        expect(typeof myDate).toBe('object');
    });

    it('should throw an arror', async () => {
        try {
            await myDate.howLongToMyBirthday('date');
        } catch (error) {
            expect(error).toBe('Wrong argument!')
        }
    });

    it('should be resolved', async () => {
        await expectAsync(myDate.howLongToMyBirthday(new Date('09-05'))).toBeResolved();
    })

    it('should log to the console', () => {
        console.log = jasmine.createSpy('log');
        myDate.howLongToMyBirthday(new Date('09-05')).then(() => {
            expect(console.log).toHaveBeenCalledWith('Soon...Please, wait just 41 day/days');
        })
    })

    it('should log to the console', () => {
        console.log = jasmine.createSpy('log');
        myDate.howLongToMyBirthday(new Date()).then(() => {
            expect(console.log).toHaveBeenCalledWith('Hooray!!! It is today!');
        })
    }) 

    it('should log to the console', () => {
        console.log = jasmine.createSpy('log');
        myDate.howLongToMyBirthday(new Date('01-05')).then(() => {
            expect(console.log).toHaveBeenCalledWith(`Oh, you have celebrated it 202 day/s ago, don't you remember?`);
        })
    })

})