import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';

const saveDataToLocalStorage = throttle(() => {
  const { email, message } = form.elements;
  const curentData = {
    email: email.value,
    message: message.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(curentData));
}, 500);

const restoreDataFromStorage = () => {
  const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const { email, message } = form.elements;

  if (savedData) {
    email.value = savedData.email;
    message.value = savedData.message;
  }
};

const clearDataFromLocalStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
};

form.addEventListener('input', saveDataToLocalStorage);

form.addEventListener('submit', event => {
  if (form.elements.email.value === '') {
    alert('Please fill in your email and let us know how we can assist you.');
    return;
  }
  event.preventDefault();
  console.log({
    email: form.elements.email.value,
    message: form.elements.message.value,
  });
  clearDataFromLocalStorage();
});

document.addEventListener('DOMContentLoaded', restoreDataFromStorage);
