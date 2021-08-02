const billionaireGame = (
  userPrize = 0,
  randomRange = 9,
  possiblePrize = 100,
  isGameActive = false
) => {
  let counter = 3;
  let currentPossiblePrize = possiblePrize;
  isGameActive = isGameActive
    ? isGameActive
    : confirm('Do you want to play a game?');
  if (!isGameActive) {
    return alert('You did not become a billionaire, but can.');
  }
  while (counter && isGameActive) {
    const randomNumber = Math.floor(Math.random() * randomRange);
    const userAnswerNumber = +prompt(
      `Choose a roulette pocket number from 0 to ${randomRange - 1}\n
        Attempts left: ${counter}\n
        Total prize: ${userPrize}\n
        Possible prize on current attempt: ${currentPossiblePrize}`
    );
    counter--;

    if (userAnswerNumber !== randomNumber) {
      currentPossiblePrize /= 2;
    } else {
      userPrize += currentPossiblePrize;
      let isRepeatGame = confirm(
        `Congratulation, you won! Your prize is: ${userPrize} $. Do you want to continue?`
      );
      if (!isRepeatGame) {
        alert(
          `Thank you for your participation. Your prize is: ${userPrize} $`
        );
      } else {
        billionaireGame(
          userPrize,
          randomRange + 4,
          possiblePrize + 100,
          isGameActive
        );
      }
      counter = 0;
    }

    if (!counter) {
      alert(`Thank you for your participation. Your prize is ${userPrize}`);
      billionaireGame();
    }
  }
};

billionaireGame();
