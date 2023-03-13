import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { formClassSelectors } from "../utils/constants.js";
import './index.css';

let myId;

// API
const api = new Api({
   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
   headers: {
     authorization: 'e8ff1818-32ec-483e-81a6-a3c457dfad06',
     'Content-Type': 'application/json'
   }
 }); 



// ИНФОРМАЦИЯ ОБ ПРОФАЙЛЕ -------------

// открытие попапа редактирования инфо об профайле
const aboutMeButton = document.getElementById('myBtn');
const formAbout = document.getElementById('editForm');
const formAboutNameInput = document.getElementById('nameInput');
const formAboutJobInput = document.getElementById('jobInput');

const submitHandlerToFormAbout = (evt, data) => {
    //отменили действие по умолчанию
    evt.preventDefault();
    //обновили текст на странице

    aboutPopup.startSaving();
    
    api.changeUserInfo(data[formAboutNameInput.getAttribute('name')], data[formAboutJobInput.getAttribute('name')])
        .then((result) => {
            // console.log(result, 'changeUserInfo');
            userInfo.setUserInfo({name: result.name, job: result.about});
            aboutPopup.closePopup();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            aboutPopup.endSaving();
        })
};


const aboutPopup = new PopupWithForm('#popup-about', submitHandlerToFormAbout);
aboutPopup.setEventListeners();

// обновление информации об профайле
const userInfo = new UserInfo({
    nameSelector: '#name-about',
    jobSelector: '#profile-about',
    avatarSelector: '.profile__avatar',
})

const cardsFromServer = new Section({
    renderer: (element) => {
        const card = createCard(element);
        cardsFromServer.addItem(card);
    },
}, '#elements-article');

Promise.all([ //в Promise.all передаем массив промисов которые нужно выполнить
    api.getUserInfo(),
    api.getInitialCards()
])
    .then((values)=>{ //попадаем сюда когда оба промиса будут выполнены
        // console.log(values[0], 'getUserInfo');
        myId = values[0]._id;
        userInfo.setUserInfo({name: values[0].name, job: values[0].about});
        userInfo.setAvatar(values[0].avatar);

        // console.log(values[1], 'getInitialCards');
        cardsFromServer.renderItems(values[1]);
})
.catch((err)=>{ //попадаем сюда если один из промисов завершаться ошибкой
  console.log(err);
}) 


// ОТКРЫТИЕ МОДАЛЬНОЙ ГАЛЕРЕИ ---------------
const popupGallery = new PopupWithImage('#popup-gallery');
popupGallery.setEventListeners();



// ОТРИСОВКА КАРТОЧЕК --------------

const deleteCard = (id) => {

    confirmDeletePopup.startSaving();

    api.deleteCard(id)
    .then(() => {
        confirmDeletePopup.confirmDeletion();
        confirmDeletePopup.closePopup();
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
        confirmDeletePopup.endSaving();
    })
}

const addLikeToCard = (id, setLikeCallback, toggleLikeClass) => {
    api.addLikeToCard(id)
    .then((result) => {
        setLikeCallback(result.likes.length);
        toggleLikeClass();
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    })
}

const deleteLikeFromCard = (id, setLikeCallback, toggleLikeClass) => {
    api.deleteLikeFromCard(id)
    .then((result) => {
        setLikeCallback(result.likes.length);
        toggleLikeClass();
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    })
}

const confirmDeletePopup = new PopupWithConfirm('.popup_view-confirmation', deleteCard);
confirmDeletePopup.setEventListeners();

const createCard = (item) => {
    return new Card('#tmp', item, popupGallery.openPopup, myId, confirmDeletePopup.openPopup, addLikeToCard, deleteLikeFromCard).generateCard();
}

// ДОБАВЛЕНИЕ КАРТОЧЕК ЧЕРЕЗ ФОРМУ ---------------

const openCardPopupButton = document.getElementById('add-card');

const formAdd = document.getElementById('addForm');
const formAddNameInput = document.getElementById('nameInputNew');
const formAddLinkInput = document.getElementById('linkInputNew');

const submitHandlerToFormAdd = (evt, data) => {
    //отменили действие по умолчанию
    evt.preventDefault();

    cardPopup.startSaving();
    
    api.addCard(data[formAddNameInput.getAttribute('name')], data[ formAddLinkInput.getAttribute('name') ])
        .then((result) => {
            //отрисовка карточки
            const newCard = createCard(result);
            cardsFromServer.addItem(newCard);
            cardPopup.closePopup();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        
        })
        .finally(() => {
            cardPopup.endSaving();
        })
};

const cardPopup = new PopupWithForm('#add-card-popup', submitHandlerToFormAdd);
cardPopup.setEventListeners();

openCardPopupButton.addEventListener('click', () => { cardPopup.openPopup() });



aboutMeButton.addEventListener('click', () => {
    aboutPopup.openPopup();
    const {job, name} = userInfo.getUserInfo()
    formAboutNameInput.value = name;
    formAboutJobInput.value = job;
});


// ПОПАП ЗАГРУЗКИ АВАТАРА
const nameInputAvatar = document.getElementById('nameInputAvatar');
const openAvatarPopupButton = document.querySelector('.profile__edit-avatar');

const submitHandlerToFormAvatar = (evt, data) => {
    //отменили действие по умолчанию
    evt.preventDefault();

    avatarPopup.startSaving();
    
    api.changeUserAvatar(data['avatar'])
        .then((result) => {
            userInfo.setAvatar(result.avatar);
            avatarPopup.closePopup();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            avatarPopup.endSaving();
        })
};

const avatarPopup = new PopupWithForm('.popup_view-avatar', submitHandlerToFormAvatar);
avatarPopup.setEventListeners();
openAvatarPopupButton.addEventListener('click', () => {avatarPopup.openPopup()})

const avatarForm = document.getElementById('editFormAvatar');


// ИНИЦИАЛИЗАЦИЯ ФОРМ

const formAddEx = new FormValidator(formClassSelectors, formAdd);
formAddEx.enableValidation();

const formAboutEx = new FormValidator(formClassSelectors, formAbout);
formAboutEx.enableValidation();

const formAvatarEx = new FormValidator(formClassSelectors, avatarForm);
formAvatarEx.enableValidation();