const phoneInput = document.querySelector('.phone-number');
const firstSymbols = '+7 (';


// Проверка на число
const isCorrectSymbol = (symbol) => (!isNaN(+symbol) && symbol !== ' ') ? true : false;


// Очищает строку от букв и других символов
const getNumbersValue = (value) => {
  return value.split('').filter((symbol) => isCorrectSymbol(symbol)).join('');
};


// Нужна для удаления последнего символа
const phoneBackspacePressHandler = (evt) => {
  const inputValue = getNumbersValue(evt.target.value);
  // 2ка это длина строки, когда 1 число это 7ка от маски номера, а второе число последнее оставшееся
  if (evt.keyCode === 8 && inputValue.length === 2) {
    evt.target.value = '';
  }
};


const phonePasteHandler = (evt) => {
  const text = evt.clipboardData.getData('text');
  
};


const phoneInputHandler = (evt) => {
  let input = evt.target;
  console.log(evt.target.value);
  let inputNumbersValue = getNumbersValue(input.value);
  let formattedValue = '';
  const selectionStart = input.selectionStart;

  if (!inputNumbersValue) {
    input.value = '';
    return;
  }

  if (input.value.length !== selectionStart) {
    if (!isCorrectSymbol(evt.data)) {
      input.value = inputNumbersValue;
    }
    return;
  }

  // console.log(inputNumbersValue, inputNumbersValue.length);
  
  if (inputNumbersValue.length === 1) {
    formattedValue = firstSymbols + inputNumbersValue;
  }
  if (inputNumbersValue.length > 1) {
    formattedValue += firstSymbols + inputNumbersValue.substring(1, 4);
  }
  if (inputNumbersValue.length >= 5) {
    formattedValue += ') ' + inputNumbersValue.substring(4, 7);
  }
  if (inputNumbersValue.length >= 8) {
    formattedValue += '-' + inputNumbersValue.substring(7, 9);
  }
  if (inputNumbersValue.length >= 10) {
    formattedValue += '-' + inputNumbersValue.substring(9, 11);
  }

  console.log(formattedValue);
  input.value = formattedValue;
};


const getFormattedData = () => {
  
};


phoneInput.addEventListener('input', phoneInputHandler);
phoneInput.addEventListener('keydown', phoneBackspacePressHandler);
phoneInput.addEventListener('paste', phonePasteHandler);
