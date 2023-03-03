import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
   constructor(selector, submitCallback) {
      super(selector);
      this._submitCallback = submitCallback;
      this._form = this._popup.querySelector('.popup__form');
      this._saveBtn = this._popup.querySelector('.popup__save');
      this._initialSaveBtnText = this._saveBtn.textContent;
   }

   _getInputValues = () => {
      // достаём все элементы полей
      this._inputList = this._form.querySelectorAll('.popup__input');

      // создаём пустой объект
      this._formValues = {};

      // добавляем в этот объект значения всех полей
      this._inputList.forEach(input => {
         this._formValues[input.name] = input.value;
      });

      // возвращаем объект значений
      return this._formValues;
   }

   closePopup() {
      super.closePopup();
      this._form.reset();
   }

   startSaving() {
      this._saveBtn.textContent = 'Сохранение...';
   }

   endSaving() {
      this._saveBtn.textContent = this._initialSaveBtnText;
   }

   setEventListeners() {
      super.setEventListeners();

      this._form.addEventListener('submit', (evt) => {
         this._submitCallback(evt, this._getInputValues());
      })
   }
} 