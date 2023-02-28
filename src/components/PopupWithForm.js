import Popup from "./Popup.js"

export default class PopupWithForm extends Popup {
   constructor(selector, submitCallback) {
      super(selector);
      this._submitCallback = submitCallback;
   }

   _getInputValues = () => {}

   setEventListeners() {
      this._popup.addEventListener('mousedown', (evt) => {
         if (evt.target.classList.contains('popup')) {
            this.closePopup();
         }
         if (evt.target.classList.contains('popup__close')) {
            this.closePopup()
         }
     })

   this._submitCallback();
   }
} 