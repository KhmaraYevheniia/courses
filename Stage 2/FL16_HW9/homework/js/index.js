/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */
import play from './play';
import getRandomChoices from './computerPlayer';
import '../scss/style.scss';

const $resetGame = document.getElementsByClassName('reset-link')[0];
const $gemplayBtns = document.getElementsByClassName('gameplay-buttons')[0];
const $visualScope = document.getElementsByClassName('visual-result')[0];
const $userScope = document.getElementsByClassName('visual-result-user')[0];
const $computerScope = document.getElementsByClassName('visual-result-computer')[0];
const $spanVS = document.getElementsByClassName('visual-result-text')[0];
const $gameResult = document.getElementsByClassName('game-result')[0];
const $h1 = document.createElement('h1');
const choicesList = ['paper', 'rock', 'scissors'];
let userChoice;
let computerChoice;
const score = {
  win: 0,
  lose: 0,
  round: 0,
};

$gemplayBtns.addEventListener('click', (event) => {
  userChoice = event.target.getAttribute('data-user-choice');

  if (userChoice && score.lose < 3 && score.win < 3) {
    computerChoice = getRandomChoices(choicesList);
    $spanVS.style.opacity = '1';

    score.round++;
    const gameResult = play(userChoice, computerChoice);

    if (gameResult === 'Draw') {
      $h1.textContent = `Round ${score.round}, ${userChoice} vs. ${computerChoice}, DRAW!`;
    } else {
      gameResult === 'WON' ? score.win++ : score.lose++;
      $h1.textContent = `Round ${score.round}, ${userChoice} vs. ${computerChoice}, You've ${gameResult}!`;
    }

    $h1.classList.add('game-result-title');
    $gameResult.append($h1);

    $visualScope.style.display = 'flex';
    $userScope.classList.remove('paper-btn', 'scissors-btn', 'rock-btn');
    $computerScope.classList.remove('paper-btn', 'scissors-btn', 'rock-btn');
    $userScope.classList.add(`${userChoice}-btn`);
    $computerScope.classList.add(`${computerChoice}-btn`);

    if (gameResult === 'WON') {
      $userScope.style.boxShadow = '0 0 5px 10px rgba(0, 230, 64, .2)';
      $computerScope.style.boxShadow = '0 0 5px 10px rgba(144, 0, 0, .2)';
    } else if (gameResult === 'LOST') {
      $userScope.style.boxShadow = '0 0 5px 10px rgba(144, 0, 0, .2)';
      $computerScope.style.boxShadow = '0 0 5px 10px rgba(0, 230, 64, .2)';
    } else {
      $userScope.style.boxShadow = '0 0 5px 10px rgba(120, 120, 120, .2)';
      $computerScope.style.boxShadow = '0 0 5px 10px rgba(120, 120, 120, .2)';
    }
  } else if (userChoice) {
    $h1.textContent = `Game Over! ${
      score.win > score.lose ? 'You WINNER!' : 'You LOSER!'
    }`;
  }
});

$resetGame.addEventListener('click', () => {
  userChoice = '';
  computerChoice = '';
  score.win = 0;
  score.lose = 0;
  score.round = 0;
  $h1.textContent = '';
  $visualScope.style.display = 'none';
});
