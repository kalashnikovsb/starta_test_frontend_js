const phoneInput = document.querySelector('.phone-number');
const mask = '+7 (___) ___-__-__';


// Проверка на число
const isCorrectSymbol = (symbol) => (!isNaN(+symbol) && symbol !== ' ') ? true : false;


// Очищает строку от букв и других символов
const getNumbersValue = (value) => {
  return value.split('').filter((symbol) => isCorrectSymbol(symbol)).join('');
};


// Нужна для удаления последнего символа
const phoneEscKeydown = (evt) => {
  const inputValue = getNumbersValue(evt.target.value);
  console.log(inputValue.length);
  // 2ка это длина строки, когда 1 число это 7ка от маски номера, а второе число последнее
  if (evt.keyCode === 8 && inputValue.length === 2) {
    evt.target.value = '';
  }
};


const phoneInputHandler = (evt) => {
  let input = evt.target;
  let inputNumbersValue = getNumbersValue(input.value);
  let formattedValue = '';
  const firstSymbols = '+7 (';

  if (!inputNumbersValue) {
    input.value = '';
    return;
  }
  
  if (inputNumbersValue.length === 1) {
    formattedValue = firstSymbols + inputNumbersValue;
  }
  if (inputNumbersValue.length > 1) {
    formattedValue += firstSymbols + inputNumbersValue.substring(1, 4);
  }
  if (inputNumbersValue.length >= 5) {
    formattedValue += ') ' + inputNumbersValue.substring(4, 7);
  }


  
  
  input.value = formattedValue;
};


phoneInput.addEventListener('input', phoneInputHandler);
phoneInput.addEventListener('keydown', phoneEscKeydown);
