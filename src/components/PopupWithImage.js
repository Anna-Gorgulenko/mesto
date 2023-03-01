import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
   constructor(selector) {
      super(selector);
      this._popupGalleryImage = this._popup.querySelector('#popup-gallery-link');
      this._popupGalleryTitle = this._popup.querySelector('#popup-gallery-name');
   }

   openPopup = (name, link) => {
      super.openPopup();

      this._popupGalleryImage.src = link;
      this._popupGalleryImage.alt = name;
      this._popupGalleryTitle.textContent = name;
   }
}