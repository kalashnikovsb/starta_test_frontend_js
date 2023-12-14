const phoneInput = document.querySelector('.phone-number__input');
const MAX_LENGTH = 11;
isPasted = false;

// Проверка на число
const isNumber = (symbol) => (!isNaN(+symbol) && symbol !== ' ') ? true : false;


// Очищает строку от букв и символов
const getNumbersValue = (value) => {
  return value.split('').filter((symbol) => isNumber(symbol)).join('');
};


// Нужна для удаления последнего символа при очистке поля
const phoneBackspaceHandler = (evt) => {
  const inputValue = getNumbersValue(evt.target.value);
  // 2ка это длина строки, когда первый символ это 7ка от маски номера "+7", а второе число последний символ при удалении
  if (evt.keyCode === 8 && inputValue.length === 2) {
    evt.target.value = '';
  }
};


// Непосредственное форматирование
const getFormattedData = (inputValue, isPasted) => {
  const firstSymbols = '+7 (';
  let result = '';
  // Если значение было вставлено, то первый символ не обрезается
  // Если ввод начался с 7ки, то +7 не вставляется вначале
  if (inputValue.length === 1) {
    result = (inputValue[0] === '7') ? firstSymbols : firstSymbols + inputValue;
  }
  if (inputValue.length > 1) {
    result += firstSymbols + ((isPasted) ? inputValue.substring(0, 3) : inputValue.substring(1, 4));
  }
  if (inputValue.length >= 5) {
    result += ') ' + ((isPasted) ? inputValue.substring(3, 6) : inputValue.substring(4, 7));
  }
  if (inputValue.length >= 8) {
    result += '-' + ((isPasted) ? inputValue.substring(6, 8) : inputValue.substring(7, 9));
  }
  if (inputValue.length >= 10) {
    result += '-' + ((isPasted) ? inputValue.substring(8, 10) : inputValue.substring(9, MAX_LENGTH));
  }
  return result;
};


// Обработчик копирования
const phonePasteHandler = (evt) => {
  isPasted = true;
};


// Обработчик блюра
const phoneBlurHandler = (evt) => {
  const numbersValueLength = getNumbersValue(evt.target.value).length;
  console.log(numbersValueLength);
  if (numbersValueLength < MAX_LENGTH) {
    phoneInput.classList.remove('phone-number__input--ok');
    phoneInput.classList.add('phone-number__input--error');
    phoneInput.setCustomValidity(`Введите пожалуйста еще ${MAX_LENGTH - numbersValueLength} символов`);
  } else {
    phoneInput.classList.remove('phone-number__input--error')
    phoneInput.classList.add('phone-number__input--ok');
    phoneInput.setCustomValidity('');
  }
  phoneInput.reportValidity();
};


// Обработчик инпута
const phoneInputHandler = (evt) => {
  let input = evt.target;
  input.setCustomValidity('');
  let numbersValue = getNumbersValue(input.value);
  const selectionStart = input.selectionStart;

  if (!numbersValue) {
    input.value = '';
    return;
  }

  if (input.value.length !== selectionStart) {
    if (!isNumber(evt.data)) {
      input.value = numbersValue;
    }
    return;
  }

  // Нужно чтобы при вставке полного номера не добавлялось +7, 7, 8 к маске
  if (numbersValue.length > 10 && isPasted && (evt.target.value.substring(0, 2) === '+7' || evt.target.value[0] === '7' || evt.target.value[0] === '8')) {
    numbersValue = numbersValue.substring(1);
  }

  const formattedData = getFormattedData(numbersValue, isPasted);
  isPasted = false;
  input.value = formattedData;
};


phoneInput.addEventListener('input', phoneInputHandler);
phoneInput.addEventListener('keydown', phoneBackspaceHandler);
phoneInput.addEventListener('paste', phonePasteHandler);
phoneInput.addEventListener('blur', phoneBlurHandler);
