const oneDayInMs = 86400000;
const daysUntilProgrammerDay = 255;

const getAge = (date) => {
    return new Date(Date.now() - date.getTime()).getFullYear() - new Date(0).getFullYear();
}

const getWeekDay = (date) => {
    return new Date(date).toLocaleString('en-us', { weekday: 'long' });
}

const getAmountDaysToNewYear = () => {
    const nextNewYear = new Date().getFullYear() + 1;
    const diffDate = new Date(nextNewYear, 0, 1) - new Date();
    const daysTillNewYear = diffDate / oneDayInMs;
    return daysTillNewYear.toFixed();
}

const getProgrammersDay = (year) => {
    const programmerDay = new Date(+new Date(year, 0, 1) + daysUntilProgrammerDay * oneDayInMs);
    const localeProgrammerDay = programmerDay
        .toLocaleString('en-us', { day: 'numeric', month: 'short', year: 'numeric' });
    return `${localeProgrammerDay} (${getWeekDay(programmerDay)})`;
}

const howFarIs = (specifiedWeekday) => {
    const dayOfWeekArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    const specifiedWeekdayIndex = dayOfWeekArray.indexOf(specifiedWeekday.toLowerCase())
    const difference = specifiedWeekdayIndex - currentDay;

    if (!difference) {
        return 'error';
    }

    return difference > 0 ? difference : dayOfWeekArray.length - specifiedWeekdayIndex;
}

const isValidIdentifier = (str) => {
    const regex = new RegExp(/\b\D\w+\d/);
    return regex.test(str);
}

const capitalize = (str) => {
    return str.replace(/(^|\s)\S/g, s => s.toUpperCase());
}

const isValidAudioFile = (fileName) => {
    const regex = new RegExp(/\b\w[^_]+\.(mp3|flac|alac|aac)\b/);
    return regex.test(fileName);
}

const getHexadecimalColors = (str) => {
    let strArr = str.replace(/;|:/g, '').split(' ');
    const regex = new RegExp(/#(?:\w{3}){1,2}\b/);
    return strArr.filter(el => regex.test(el));
}

const isValidPassword = (password) => {
    const regex = new RegExp(/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])[0-9a-zA-Z]{8,}/g);
    return regex.test(password);
}

const addThousandsSeparators = (str) => {
    return str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,');
}

const getAllUrlsFromText = (str) => {
    try {
        let strArr = str.split(' ');
        let regex = new RegExp(/\b(https)|(\/)/g);

        return strArr.filter(el => regex.test(el));
    } catch (error) {
        return '(error)';
    }
}