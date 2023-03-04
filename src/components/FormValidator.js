export default class FormValidator {
  constructor(config, popup) {
    this._form = popup
    this._config = config
    this._buttonSave = this._form.querySelector(
      this._config.submitButtonSelector
    )
    this._inputList = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    )
  }

  enableValidation() {
    this._setEventListeners()
  }

  disableSubmitButton() {
    this._buttonSave.classList.remove(this._config.activeButtonClass)
    this._buttonSave.classList.add(this._config.inactiveButtonClass)
    this._buttonSave.disabled = true
  }

  enableSubmitButton() {
    this._buttonSave.classList.add(this._config.activeButtonClass)
    this._buttonSave.classList.remove(this._config.inactiveButtonClass)
    this._buttonSave.disabled = false
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`)
    errorElement.classList.add(this._config.errorClass)
    errorElement.textContent = inputElement.validationMessage
    inputElement.classList.add(this._config.inputErrorClass)
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`)
    errorElement.classList.remove(this._config.errorClass)
    errorElement.textContent = ""
    inputElement.classList.remove(this._config.inputErrorClass)
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement)
    } else {
      this._showInputError(inputElement)
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid)
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton()
    } else {
      this.enableSubmitButton()
    }
  }

  _setEventListeners() {
    this._toggleButtonState(this._inputList, this._buttonSave)

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement)
        this._toggleButtonState(this._inputList, this._buttonSave)
      })
    })
  }
}

export { FormValidator }

/*class FormValidator {
   constructor(data, form) {
      this._data = data;
      this._form = form;

      this._initInnerElements(); // определение внутренних элементов формы
   }

   _initInnerElements() {
      this._inputList = Array.from(this._form.querySelectorAll(this._data.inputSelector));
      this._submitButton = this._form.querySelector(this._data.submitButtonSelector);
   }

   _disableSubmitButton() {
      this._submitButton.classList.add(this._data.inactiveButtonClass);
      this._submitButton.disabled = true;
   }

   _enableSubmitButton() {
      this._submitButton.classList.remove(this._data.inactiveButtonClass);
      this._submitButton.disabled = false;
   }

   _setEventListeners = () => {
      //отключение кнопок при reset формы
      this._form.addEventListener('reset', () => {
         this._disableSubmitButton();
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
      if (this._hasInvalidInput()) {
        this._disableSubmitButton();
      } else {
         this._enableSubmitButton();
      }
    }; 

   enableValidation = () => { this._setEventListeners() };
}*/
