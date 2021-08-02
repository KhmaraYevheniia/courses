const percentPerYear = () => {
  let initialAmount = +prompt('Enter initial amount of money');
  if (isNaN(initialAmount) || initialAmount < 1000) {
    return alert('Invalid input data');
  }
  let years = +prompt('Enter number of years');
  if (isNaN(years) || years < 1 || !Number.isInteger(years)) {
    return alert('Invalid input data');
  }
  let percent = +prompt('Enter percentage of a year');
  if (isNaN(percent) || percent > 100) {
    return alert('Invalid input data');
  }
  let currentAmount = initialAmount;

  for (let i = 1; i <= years; i++) {
    currentAmount += currentAmount * (percent / 100);
  }

  let profit = currentAmount - initialAmount;

  alert(
    `Initial amount: ${initialAmount}\nNumber of years: ${years}\nPercentage of year: ${percent}\n` +
      `\nTotal profit: ${
        Number.isInteger(profit) ? profit : profit.toFixed(2)
      }\nTotal amount: ${
        Number.isInteger(currentAmount)
          ? currentAmount
          : currentAmount.toFixed(2)
      }`
  );
};

percentPerYear();
