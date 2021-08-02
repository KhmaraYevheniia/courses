const table = document.getElementById('table');
const tdList = document.querySelectorAll('td');
const tr = document.querySelectorAll('tr');
const specialCell = document.getElementById('specialCell');

specialCell.addEventListener('click', () => {
    Array.from(tdList).forEach(element => {
        if (!element.classList.contains('color-yellow') && !element.classList.contains('color-blue')) {
            element.classList.add('color-yellow');
        }
    });
})

table.addEventListener('click', (event) => {
    let tdFill = event.target;

    if (tdFill.classList.contains('first-column')) {
        Array.from(tdFill.parentElement.children).forEach(element => {
            if (!element.classList.contains('color-yellow')) {
                element.classList.add('color-blue');
            }
        });
    } else {
        tdFill.classList.add('color-yellow');
    }
})

const btn = document.querySelector('.btn');
const input = document.querySelector('.input');
const form = document.getElementById('form');
const message = document.createElement('p');

const regex = new RegExp(/^(?:\+3)?8?(0\d{9})$/);

input.addEventListener('input', (event) => {

    if (!regex.test(event.target.value)) {
        input.classList.add('input-invalid');
        btn.setAttribute('disabled', 'disabled');
        message.textContent = 'Type number does not follow format +380*********';
        message.classList.add('message-invalid');
        form.prepend(message);
    } else {
        btn.removeAttribute('disabled');
        message.classList.remove('message-invalid');
        input.classList.remove('input-invalid');
        form.removeChild(message)
    }
});

btn.addEventListener('click', (event) => {
    event.preventDefault();
    message.textContent = 'Data was successfully sent';
    message.classList.add('message-valid');
    form.prepend(message);
});

const court = document.getElementsByClassName('court-wrap')[0];
const ball = document.getElementsByClassName('ball')[0];
const areaA = document.getElementsByClassName('area-a')[0];
const areaB = document.getElementsByClassName('area-b')[0];
const score = document.getElementsByClassName('score')[0];
const teamA = document.getElementsByClassName('teamA')[0];
const teamB = document.getElementsByClassName('teamB')[0];
let messageA = document.createElement('p');
let messageB = messageA.cloneNode();
let teamAScore = 0;
let teamBScore = 0;
teamA.append(teamAScore);
teamB.append(teamBScore);
let isGameActive = false;

court.addEventListener('click', (event) => {
    if (!isGameActive) {
        isGameActive = true;

        let fieldCoords = court.getBoundingClientRect();
        let ballCoords = {
            top: event.clientY - fieldCoords.top - court.clientTop - ball.clientHeight / 2,
            left: event.clientX - fieldCoords.left - court.clientLeft - ball.clientWidth / 2
        };

        if (ballCoords.top < 0) {
            ballCoords.top = 0;
        }

        if (ballCoords.left < 0) {
            ballCoords.left = 0;
        }

        if (ballCoords.left + ball.clientWidth > court.clientWidth) {
            ballCoords.left = court.clientWidth - ball.clientWidth;
        }

        if (ballCoords.top + ball.clientHeight > court.clientHeight) {
            ballCoords.top = court.clientHeight - ball.clientHeight;
        }

        ball.style.left = ballCoords.left + 'px';
        ball.style.top = ballCoords.top + 'px';

        if (event.target === areaA) {
            const goalEvent = new CustomEvent('goal', { detail: { team: 'A' } });
            court.dispatchEvent(goalEvent);
        } else if (event.target === areaB) {
            const goalEvent = new CustomEvent('goal', { detail: { team: 'B' } });
            court.dispatchEvent(goalEvent)
        } else {
            const goalEvent = new CustomEvent('miss', { detail: { team: event.clientX > 570 ? 'A' : 'B' } });
            court.dispatchEvent(goalEvent)
        }

        setTimeout(() => {
            ball.style.top = '145px';
            ball.style.left = '280px';
            isGameActive = false;
        }, 3000);
    }
})

court.addEventListener('goal', (event) => {
    if (event.detail.team === 'A') {
        teamAScore++;
        messageA.textContent = 'Team B score!';
        messageA.classList.add('message-areaB');
        score.after(messageA);
        teamA.innerHTML = `Team A: ${teamAScore}`;

        setTimeout(() => {
            messageA.innerHTML = '';
        }, 3000);
        return;
    }

    if (event.detail.team === 'B') {
        teamBScore++;
        messageB.textContent = 'Team A score!';
        messageB.classList.add('message-areaA');
        score.after(messageB);
        teamB.innerHTML = `Team B: ${teamBScore}`;

        setTimeout(() => {
            messageB.innerHTML = '';
        }, 3000);
        return;
    }
})

court.addEventListener('miss', (event) => {
    const missMessage = messageA.cloneNode();
    missMessage.classList.add('message-miss');
    missMessage.textContent = `Team ${event.detail.team} missed`;
    score.after(missMessage);
    setTimeout(() => {
        missMessage.textContent = '';
    }, 3000);
})