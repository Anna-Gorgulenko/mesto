export default class Api {
   constructor(options) {
     this._baseUrl = options.baseUrl;
     this._headers = options.headers;
   }

   _getResponseData(res) {
      if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`); 
      }
      return res.json();
  } 
 
   /* Загрузка информации о пользователе с сервера */
   getUserInfo() {
     return fetch(`${this._baseUrl}/users/me `, {
      headers: { authorization: this._headers.authorization },
    })
      .then(res => this._getResponseData(res));
   }
 
   /* Загрузка карточек с сервера */
   getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
         headers: { authorization: this._headers.authorization },
      })
      .then(res => this._getResponseData(res));
   }

   /*  Редактирование профиля */
   changeUserInfo(name, about) {
      return fetch(`${this._baseUrl}/users/me`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({ name, about })
      })
      .then(res => this._getResponseData(res));
   }

   /* Добавление новой карточки */
   addCard(name, link) {
      return fetch(`${this._baseUrl}/cards`, {
         method: 'POST',
         headers: this._headers,
         body: JSON.stringify({ name, link })
      })      
      .then(res => this._getResponseData(res));
   }

   /* Удаление карточки */
   deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
         method: 'DELETE',
         headers: { authorization: this._headers.authorization },
      })      
      .then(res => this._getResponseData(res));
   }

   /* Постановка и снятие лайка */
   addLikeToCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
         method: 'PUT',
         headers: { authorization: this._headers.authorization },
      })      
      .then(res => this._getResponseData(res));
   }

   deleteLikeFromCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
         method: 'DELETE',
         headers: { authorization: this._headers.authorization },
      })      
      .then(res => this._getResponseData(res));
   }

   /* Обновление аватара пользователя */
   changeUserAvatar(avatar) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({ avatar })
      })      
      .then(res => this._getResponseData(res));
   }
 }
 