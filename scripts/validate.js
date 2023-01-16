const enableValidation = (settings) => {

   const setSubmitButtonDisabled = (button, bool) => {
      if (bool) {
         button.classList.add(settings.inactiveButtonClass);
         button.disabled = true;
      } else {
         button.classList.remove(settings.inactiveButtonClass);
         button.disabled = false;
      }
   }

   const showInputError = (formElement, inputElement, errorMessage) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(settings.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(settings.errorClass);
   };

   const hideInputError = (formElement, inputElement) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      const submitButton = formElement.querySelector(settings.submitButtonSelector);
      inputElement.classList.remove(settings.inputErrorClass);
      errorElement.classList.remove(settings.errorClass);
      errorElement.textContent = '';
   };

   const checkInputValidity = (formElement, inputElement, errors, index) => {
      if (inputElement.value === '' || !inputElement.validity.valid) {
         showInputError(formElement, inputElement, inputElement.validationMessage);
         errors[index] = true;
      } else {
         hideInputError(formElement, inputElement);
         errors[index] = false;
      }
      const submitButton = formElement.querySelector(settings.submitButtonSelector);
      if (errors.some((element) => element === true)) {
         setSubmitButtonDisabled(submitButton, true);
      } else {
         setSubmitButtonDisabled(submitButton, false);
      }
   };

   const setEventListeners = (formElement) => {
      const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
      const errors = Array.from({ inputList }).fill(true);
      inputList.forEach((inputElement, index) => {
         inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, errors, index);
         });
      });
   };

   const formList = Array.from(document.querySelectorAll(settings.formSelector));
   formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
         evt.preventDefault();
      });
      setEventListeners(formElement);
   });
};

enableValidation({
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__save',
   inactiveButtonClass: 'popup__save_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'error_visible'
});




