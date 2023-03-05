export default class Card {
   constructor(templateSelector, item, clickImageHandler, userId, clickDeleteHandler, clickAddLikeHandler, clickRemoveLikehandler) {
      this._templateSelector = templateSelector;
      this._itemData = item;
      this._clickImageHandler = clickImageHandler;
      this._clickDeleteHandler = clickDeleteHandler;
      this._clickAddLikeHandler = clickAddLikeHandler;
      this._clickRemoveLikehandler = clickRemoveLikehandler;
      this._userId = userId;
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
      this._likeCounter = this._article.querySelector('.element__count-like');
   }

   _setImageSrcAndAlt() {
      this._image.src = this._itemData.link;
      this._image.alt = this._itemData.name;
   }

   _setTitleText() {
      this._title.textContent = this._itemData.name;
   }

   setLikesCounter = (num) => {
      this._likeCounter.textContent = num;
   }

   _toggleLikeBtnClass() {
      if (this._likeBtn.classList.contains('element__like-button_active')) {
         this._clickRemoveLikehandler(this._itemData._id, this.setLikesCounter);
      } else {
         this._clickAddLikeHandler(this._itemData._id, this.setLikesCounter);
      }
      this._likeBtn.classList.toggle('element__like-button_active');
   }

   _setEventListeners = () => {
      this._image.addEventListener('click', () => { this._clickImageHandler(this._itemData.name, this._itemData.link) });
      this._basketBtn.addEventListener('click', () => {this._clickDeleteHandler(this._itemData._id, this._article)});
      this._likeBtn.addEventListener('click', () => {this._toggleLikeBtnClass()});
   }

   generateCard() {
      this._article = this._getTemplate(); // склонировали разметку карточки и сохранили в _article
      this._initInnerElements(); // определяем внутренние элементы
      this._setImageSrcAndAlt(); // подставляем src и alt для изображения
<<<<<<< HEAD
      this._setTitleText(); // подставляем текст  в заголовок
=======
      this._setTitleText(); // подставляем текст в заголовок
>>>>>>> d763bb0edbaec05c7b9ce69ead5d579010fd73d1
      this.setLikesCounter(this._itemData.likes.length);
      this._setEventListeners(); // установим обработчики события
      if (this._itemData.likes.some((like) => like._id === this._userId)) this._likeBtn.classList.add('element__like-button_active');
      if (this._userId !== this._itemData.owner._id ) this._basketBtn.remove();
      return this._article
   }

}
