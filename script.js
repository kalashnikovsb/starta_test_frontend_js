const phoneInput = document.querySelector('.phone-number');
const result = '';

phoneInput.addEventListener('input', (evt) => {
  evt.preventDefault();
  evt.target.value.split('').forEach((item) => {
    if (!isNaN(+item)) {
      result = result.push(item);
    }
  });
  console.log(result);
});