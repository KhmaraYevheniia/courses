let reg = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/;

function showForm() {
  let formWrap = document.querySelector('#formWrap');
  formWrap.classList.remove('hide');
}

let eventName = prompt('Enter event name: ', 'meeting');
if (eventName) {
  showForm();
}

let btnConfirm = document.querySelector('#btnConfirm');
btnConfirm.addEventListener('click', (event) => {
  event.preventDefault();
  let form = document.getElementById('form');
  let isValidForm = form.checkValidity();

  if (!isValidForm) {
    return alert('Input all data')
  }

  let time = form.elements['time'].value;
  let name = form.elements['name'].value;
  let place = form.elements['place'].value;
  let isTimeValid = new RegExp(reg).test(time)

  if (!isTimeValid) {
    alert('Enter time in format hh:mm');
  }

  if (isValidForm && isTimeValid) {
    console.log(`${name} has a ${eventName} today at ${time} somewhere in ${place}`);
  }
});

let btnConverter = document.querySelector('#btnConverter');

btnConverter.addEventListener('click', (event) => {
  event.preventDefault();
  const euro = 33.46;
  const dollar = 27.44;
  const userEuro = prompt('Enter amount of euro: ');

  if (userEuro === null) {
    return alert('You are clicked on Cancel!')
  } else if (!userEuro || userEuro < 0) {
    return alert('Amount must be positive!');
  }

  const userDollar = prompt('Enter amount of dollar: ');

  if (userDollar === null) {
    return alert('You are clicked on Cancel!')
  } else if (!userDollar || userDollar < 0) {
    return alert('Amount must be positive!');
  }

  const amountEuro = userEuro * euro;
  const amountDollar = userDollar * dollar;

  return alert(`${userEuro} euros are equal ${amountEuro.toFixed(2)} hrns,` +
    ` ${userDollar} dollars are equal ${amountDollar.toFixed(2)} hrns`)
});