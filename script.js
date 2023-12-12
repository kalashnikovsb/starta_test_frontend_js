const phoneInput = document.querySelector('.phone-number');
'+7 (___) ___-__-__';


// Возвращает строку только с цифрами без букв
const getCorrectValue = (value) => {
  return value.split('').filter((item) => (!isNaN(+item)) ? true : false).join('');
};


phoneInput.addEventListener('input', (evt) => {
  evt.preventDefault();
  const input = evt.target;
  let inputValue = getCorrectValue(evt.target.value);
  let formattedValue = '';

  console.log(inputValue);

  if (!inputValue) {
    input.value = '';
    return;
  }
  
  formattedValue = '+7' + inputValue.slice(1);

  input.value = formattedValue;
});
