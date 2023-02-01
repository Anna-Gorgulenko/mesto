export default class Card {
   constructor(templateSelector, name, link, clickImageHandler) {
      this._templateSelector = templateSelector;
      this._name = name;
      this._link = link;
      this._clickImageHandler = clickImageHandler;

      this._article = this._getTemplate(); // склонировали разметку карточки и сохранили в _article
      this._initInnerElements(); // определяем внутренние элементы
      this._setImageSrcAndAlt(); // подставляем src и alt для изображения
      this._setTitleText(); // подставляем текст в заголовок
      this._setEventListeners(); // установим обработчики события
   }

   _getTemplate() {
      const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);
  
      return cardElement;
   }

   _initInnerElements() {
      this._image = this._article.querySelector('.element__mask');
      this._title = this._article.querySelector('.element__title');
      this._basketBtn = this._article.querySelector('.element__basket');
      this._likeBtn = this._article.querySelector('.element__like-button');
   }

   _setImageSrcAndAlt() {
      this._image.src = this._link;
      this._image.alt = this._name;
   }

   _setTitleText() {
      this._title.textContent = this._name;
   }

   _setEventListeners() {
      this._image.addEventListener('click', () => { this._clickImageHandler(this._article) });
      this._basketBtn.addEventListener('click', () => { this._article.remove(); });
      this._likeBtn.addEventListener('click', () => { this._likeBtn.classList.toggle('element__like-button_active'); });
   }

   generateCard() { return this._article }

}
