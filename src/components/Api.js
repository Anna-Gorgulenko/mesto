export default class Api {
   constructor(options) {
     this._baseUrl = options.baseUrl;
     this._headers = options.headers;
   }
 
   /* Загрузка информации о пользователе с сервера */
   getUserInfo() {
     return fetch(`${this._baseUrl}/users/me `, {
      headers: { authorization: this._headers.authorization },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
   }
 
   /* Загрузка карточек с сервера */
   getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
         headers: { authorization: this._headers.authorization },
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
   }

   /*  Редактирование профиля */
   changeUserInfo(name, about) {
      return fetch(`${this._baseUrl}/users/me`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({ name, about })
      })
      .then(res => {
         if (res.ok) {
           
           return res.json();
         }
         return Promise.reject(`Ошибка: ${res.status}`);
      });
   }

   /* Добавление новой карточки */
   addCard(name, link) {
      return fetch(`${this._baseUrl}/cards`, {
         method: 'POST',
         headers: this._headers,
         body: JSON.stringify({ name, link })
      })      
      .then(res => {
         if (res.ok) {
           return res.json();
         }
         return Promise.reject(`Ошибка: ${res.status}`);
      });
   }

   /* Удаление карточки */
   deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
         method: 'DELETE',
         headers: { authorization: this._headers.authorization },
      })      
      .then(res => {
         if (res.ok) {
           return res.json();
         }
         return Promise.reject(`Ошибка: ${res.status}`);
      });
   }

   /* Постановка и снятие лайка */
   addLikeToCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
         method: 'PUT',
         headers: { authorization: this._headers.authorization },
      })      
      .then(res => {
         if (res.ok) {
           return res.json();
         }
         return Promise.reject(`Ошибка: ${res.status}`);
      });
   }

   deleteLikeFromCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
         method: 'DELETE',
         headers: { authorization: this._headers.authorization },
      })      
      .then(res => {
         if (res.ok) {
           return res.json();
         }
         return Promise.reject(`Ошибка: ${res.status}`);
      });
   }

   /* Обновление аватара пользователя */
   changeUserAvatar(avatar) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
         method: 'PATCH',
         headers: this._headers,
         body: JSON.stringify({ avatar })
      })      
      .then(res => {
         if (res.ok) {
           return res.json();
         }
         return Promise.reject(`Ошибка: ${res.status}`);
      });
   }


 }
 