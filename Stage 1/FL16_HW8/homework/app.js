function reverseNumber(num) {
  let reversedNumber = 0;
  const factor = num > 0 ? 1 : -1;
  num = Math.abs(num);
  while (num > 0) {
    reversedNumber = reversedNumber * 10 + num % 10;
    num = Math.floor(num / 10);
  }
  return reversedNumber * factor;
}

function forEach(arr, func) {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(func(arr[i]));
  }
  return newArr;
}

function map(arr, func) {
  return forEach(arr, func);
}

function filter(arr, func) {
  newFIlterArr = [];
  filteredMap = forEach(arr, func);

  for (let i = 0; i < arr.length; i++) {
    if (filteredMap[i]) {
      newFIlterArr.push(arr[i]);
    }
  }

  return newFIlterArr;
}

function getAdultAppleLovers(data) {
  return filter(data, function (el) {
    return el.age > 18 && el.favoriteFruit === 'apple';
  });
}

function getKeys(obj) {
  let arrKeys = [];
  for (let key in obj) {
    arrKeys.push(key);
  }
  return arrKeys;
}

function getValues(obj) {
  let arrValue = [];
  for (let key in obj) {
    arrValue.push(obj[key]);
  }
  return arrValue;
}

function showFormattedDate(dateObj) {
  let nameOfMonths = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let date = dateObj.getDate();
  let month = dateObj.getMonth();
  let year = dateObj.getFullYear();
  return `It is ${date} of ${nameOfMonths[month]}, ${year}`;
}