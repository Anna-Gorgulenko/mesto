const enableValidation = (settings) => {

   const showInputError = (formElement, inputElement, errorMessage) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(settings.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(settings.errorClass);
   };

   const hideInputError = (formElement, inputElement) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(settings.inputErrorClass);
      errorElement.classList.remove(settings.errorClass);
      errorElement.textContent = '';
   };

   const checkInputValidity = (formElement, inputElement) => {
      if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
      } else {
        hideInputError(formElement, inputElement);
      }
    };

   const hasInvalidInput = (inputList) => {
      return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
      });
    };
    
    const toggleButtonState = (inputList, buttonElement) => {
      if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(settings.inactiveButtonClass);
        buttonElement.disabled = true;
      } else {
        buttonElement.classList.remove(settings.inactiveButtonClass);
        buttonElement.disabled = false;
      }
    }; 

   const setEventListeners = (formElement) => {
      const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
      //отключение кнопок при reset формы
      const submitButton = formElement.querySelector(settings.submitButtonSelector);
      formElement.addEventListener('reset', () => {
         submitButton.classList.add(settings.inactiveButtonClass);
         submitButton.disabled = true;
      });
      inputList.forEach((inputElement) => {
         inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, submitButton);
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




