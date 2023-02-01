export default class FormValidator {
   constructor(data, form) {
      this._data = data;
      this._form = form;

      this._initInnerElements(); // определение внутренних элементов формы
   }

   _initInnerElements() {
      this._inputList = Array.from(this._form.querySelectorAll(this._data.inputSelector));
      this._submitButton = this._form.querySelector(this._data.submitButtonSelector);
   }

   _setEventListeners = () => {
      //отключение кнопок при reset формы
      this._form.addEventListener('reset', () => {
         this._submitButton.classList.add(this._data.inactiveButtonClass);
         this._submitButton.disabled = true;
      });
      this._inputList.forEach((inputElement) => {
         inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggleButtonState(this._inputList, this._submitButton);
         });
      });
   };

   _showInputError = (inputElement, errorMessage) => {
      const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this._data.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._data.errorClass);
   };

   _hideInputError = (inputElement) => {
      const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this._data.inputErrorClass);
      errorElement.classList.remove(this._data.errorClass);
      errorElement.textContent = '';
   };

   _checkInputValidity = (inputElement) => {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    };

   _hasInvalidInput = () => {
      return this._inputList.some((inputElement) => {
         return !inputElement.validity.valid;
      });
    };
    
   _toggleButtonState = () => {
      if (this._hasInvalidInput(this.inputList)) {
        this._submitButton.classList.add(this._data.inactiveButtonClass);
        this._submitButton.disabled = true;
      } else {
        this._submitButton.classList.remove(this._data.inactiveButtonClass);
        this._submitButton.disabled = false;
      }
    }; 

   enableValidation = () => { this._setEventListeners() };
}