export default class Popup {
   constructor(selector) {
      this._popup = document.querySelector(selector);
   }

   _closeByEscape = (evt) => {
      if (evt.key === 'Escape') {
          this.closePopup();
      }
   }

   openPopup() {
      this._popup.classList.add('popup_opened')
      document.addEventListener('keydown', this._closeByEscape)
   }

   closePopup() {
      this._popup.classList.remove('popup_opened')
      document.removeEventListener('keydown', this._closeByEscape)
   }
   
   setEventListeners() {
      this._popup.addEventListener('mousedown', (evt) => {
         if (evt.target.classList.contains('popup')) {
            this.closePopup();
         }
         if (evt.target.classList.contains('popup__close')) {
            this.closePopup()
         }
     })
   }
   
}