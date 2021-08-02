const play = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) {
    return 'Draw';
  }

  switch (userChoice) {
    case 'rock':
      return computerChoice === 'scissors' ? 'WON' : 'LOST';
    case 'scissors':
      return computerChoice === 'paper' ? 'WON' : 'LOST';
    case 'paper':
      return computerChoice === 'rock' ? 'WON' : 'LOST';
    default:
      return '';
  }
};

export { play as default };
