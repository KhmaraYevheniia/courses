const operators = ['/', '*', '+', '-'];
let calculationString = '0';
let firstNumber;
let operator;
let secondNumber;
let resultsArray = [];
let tempResult;

$(document).ready(function () {
    $('.calculator-display').text(calculationString);
    $('.calculator-buttons').click(function (e) {

        $('.operator, .calculate').removeAttr('disabled', 'disabled');

        if (e.target.value) {

            if (e.target.value === 'C') {
                calculationString = '0';
                firstNumber = '';
                secondNumber = '';
                operator = '';
                return $('.calculator-display').text(calculationString).css('color', 'black');
            }

            if (e.target.value === '=') {

                if (firstNumber && operator && calculationString) {
                    secondNumber = calculationString;

                    if (!+secondNumber && operator === '/') {
                        return displayError();
                    }

                    const resultObj = calculate();
                    resultsArray.push(resultObj);
                    operator = '';
                    tempResult = resultObj.result;
                    firstNumber = resultObj.result;

                    $('.logs').text('');
                    $('.calculator-display').text(resultObj.result);
                    return draw();
                }

                return;
            }

            if (operators.includes(e.target.value)) {

                if (tempResult) {

                    firstNumber = tempResult;
                    operator = e.target.value;
                    tempResult = '';
                    return $('.calculator-display').text(firstNumber + operator);

                } else if (!firstNumber) {

                    firstNumber = calculationString;
                    operator = e.target.value;
                    calculationString = '';
                    return $('.calculator-display').text(firstNumber + operator);

                } else if (firstNumber && operator && !calculationString) {

                    operator = e.target.value;
                    return $('.calculator-display').text(firstNumber + operator);

                } else if (firstNumber && operator) {

                    if (calculationString) {
                        secondNumber = calculationString;
                    }

                    if (!+secondNumber && operator === '/') {
                        return displayError();
                    }

                    firstNumber = calculate().result;
                    operator = e.target.value;
                    $('.calculator-display').text(firstNumber + operator);
                }

            } else {

                if (tempResult) {
                    tempResult = '';
                    firstNumber = '';
                    operator = '';
                    calculationString = '';
                }

                calculationString = calculationString === '0' ? '' : calculationString;
                calculationString += e.target.value;

                const textToDisplay = firstNumber
                    ? firstNumber + operator + calculationString
                    : calculationString;
                return $('.calculator-display').text(textToDisplay).css('color', 'black');

            }
        }
    })
})

function calculate() {

    let result = 0;
    switch (operator) {
        case '+': result = +firstNumber + +secondNumber;
            break;
        case '-': result = +firstNumber - +secondNumber;
            break;
        case '*': result = +firstNumber * +secondNumber;
            break;
        case '/': result = +firstNumber / +secondNumber;
            break;
        default: break;
    }

    const resultObj = {
        firstNumber,
        operator,
        secondNumber,
        result
    };

    calculationString = '';
    firstNumber = '';
    secondNumber = '';
    return resultObj;
}

function draw() {
    resultsArray.forEach((el, index) => {
        const isEqual = el.result && el.result % 48 === 0;
        const log = `
            <div class="logs-item">
                <div class="logs-circle"></div>
                <div class="logs-calculate ${isEqual ? 'underline' : ''}">
                ${el.firstNumber}${el.operator}${el.secondNumber}=${parseInt(el.result)
                ? el.result
                : el.result.toFixed(2)}
                </div>
                <div class="logs-close" id="${index}">✕</div>
            </div>
        `;

        $('.logs').prepend(log);
    })

    $('.logs-close').click(function (event) {
        resultsArray = resultsArray.filter((_, index) => +event.target.id !== index);
        $('.logs').text('');
        draw();
    })

    $('.logs-circle').click(function () {
        $(this).toggleClass('logs-circle-fill');
    })

    $('.logs').scroll(function () {
        console.log(`Scroll Top: ${$(this).scrollTop()}`);
    })
}

function displayError() {
    calculationString = '';
    firstNumber = '';
    secondNumber = '';
    operator = '';
    $('.operator, .calculate').attr('disabled', 'disabled');
    return $('.calculator-display').text('ERROR').css('color', 'red');
}