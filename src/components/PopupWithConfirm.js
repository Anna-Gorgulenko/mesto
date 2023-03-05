import Popup from "./Popup.js"

export default class PopupWithConfirm extends Popup {
   constructor(selector, clickCardDeleteHandler) {
      super(selector);
      this._saveBtn = this._popup.querySelector('.popup__save');
      this._initialSaveBtnText = this._saveBtn.textContent;
      this._currentCardId = null;
      this._clickCardDeleteHandler = clickCardDeleteHandler;
      this._currentElementToDelete = null;
   }

   openPopup = (id, deleteCardCallback) => {
      super.openPopup();
      this._currentCardId = id;
      this._deleteCardCallback = deleteCardCallback;
   }

   startSaving() {
      this._saveBtn.textContent = 'Удаление...';
   }

   confirmDeletion() {
      this._deleteCardCallback();
   }

   endSaving() {
      this._saveBtn.textContent = this._initialSaveBtnText;
   }

   setEventListeners() {
      super.setEventListeners();
      this._saveBtn.addEventListener('click', () => { this._clickCardDeleteHandler(this._currentCardId) });
   }
} 