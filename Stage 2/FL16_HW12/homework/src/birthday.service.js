class BirthdayService {

    async howLongToMyBirthday(date) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!this.isValidDate(date)) {
                    return reject('Wrong argument!')
                }

                this.birthday = date.setYear(2021);

                const time = this.birthday - + new Date();
                const days = time / (1000 * 60 * 60 * 24);
                if (days >= -1 && days <= 0) {
                    resolve(this.congratulateWithBirthday());
                } else {
                    resolve(this.notifyWaitingTime(days));
                }
            }, 100);
        })
    }

    isValidDate(d) {
        return d instanceof Date && !isNaN(d);
    }

    congratulateWithBirthday() {
        this.log('Hooray!!! It is today!');
    }

    notifyWaitingTime(days) {
        const realDays = days > 0 ? parseInt(Math.abs(days) + 1) : parseInt(Math.abs(days));
        days > 0
            ? this.log(`Soon...Please, wait just ${realDays} day/days`)
            : this.log(`Oh, you have celebrated it ${realDays} day/s ago, don't you remember?`)
    }

    log(message) {
        console.log(message)
    }

}

module.exports = BirthdayService;

