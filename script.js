const phoneInput = document.querySelector('.phone-number');
const mask = '+7 (___) ___-__-__';


const isCorrectSymbol = (symbol) => (!isNaN(+symbol)) ? true : false;


const getNumbersValue = (value) => {
  return value.split('').filter((symbol) => isCorrectSymbol(symbol)).join('');
};


const phoneInputHandler = (evt) => {
  let input = evt.target;
  let inputNumbersValue = getNumbersValue(input.value);
  let formattedValue = '';

  if (!inputNumbersValue) {
    input.value = '';
    return;
  }

  console.log(inputNumbersValue.length);
  
  let firstSymbols = '+7(';
  // if (inputNumbersValue.length === 1) {
  //   formattedValue += firstSymbols + inputNumbersValue;
  // }
  if (inputNumbersValue.length === 2) {
    formattedValue = '';
  }
  if (inputNumbersValue.length >= 1) {
    formattedValue += firstSymbols + inputNumbersValue.substring(1, 4);
  }
  if (inputNumbersValue.length >= 5) {
    formattedValue += ')' + inputNumbersValue.substring(4, 7);
  }

  

  input.value = formattedValue;
};


phoneInput.addEventListener('input', phoneInputHandler);