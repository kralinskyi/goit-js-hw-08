import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const saveDataToLocalStorage = throttle(() => {
  const { email, message } = form.elements;
  const curentData = {
    email: email.value,
    message: message.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(curentData));
}, 500);

const restoreDataFromStorage = () => {
  const savedData = JSON.parse(localStorage.getItem('feedback-form-state'));
  const { email, message } = form.elements;

  if (savedData) {
    email.value = savedData.email;
    message.value = savedData.message;
  }
};

const clearDataFromLocalStorage = () => {
  localStorage.removeItem('feedback-form-state');
  form.reset();
};

form.addEventListener('input', saveDataToLocalStorage);

form.addEventListener('submit', event => {
  event.preventDefault();
  console.log({
    email: form.elements.email.value,
    message: form.elements.message.value,
  });
  clearDataFromLocalStorage();
});

document.addEventListener('DOMContentLoaded', restoreDataFromStorage);
