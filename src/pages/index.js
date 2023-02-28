import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import './index.css'

// СПИСОК КАРТОЧЕК --------------

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];



// ОТКРЫТИЕ МОДАЛЬНОЙ ГАЛЕРЕИ ---------------
const popupGallery = new PopupWithImage('#popup-gallery');
popupGallery.setEventListeners();

// function openPopupGallery(name, link) {
//     //открыть попап
//     openPopup(popupGallery);
//     //вставляем полученные данные в попап
//     popupGalleryImage.src = link;
//     popupGalleryImage.alt = name;
//     popupGalleryTitle.textContent = name;
// }



// ОТРИСОВКА КАРТОЧЕК --------------

const cardsParent = document.getElementById('elements-article');

const createCard = (tmp, name, link, func) => {
    return new Card(tmp, name, link, func).generateCard();
}

const defaultCardList = new Section({
    data: initialCards,
    renderer: (element) => {
        const card = createCard('#tmp', element.name, element.link, popupGallery.openPopup);
        defaultCardList.addItem(card);
    }
}, '#elements-article');

defaultCardList.renderItems();



// ДОБАВЛЕНИЕ КАРТОЧЕК ЧЕРЕЗ ФОРМУ ---------------

const openCardPopupButton = document.getElementById('add-card');

const formAdd = document.getElementById('addForm');
const formAddNameInput = document.getElementById('nameInputNew');
const formAddLinkInput = document.getElementById('linkInputNew');

const addSubmitListenerToFormAdd = () => {
    formAdd.addEventListener('submit', (evt) => {
        //отменили действие по умолчанию
        evt.preventDefault();
        //получение значений формы
        const nameValue = formAddNameInput.value;
        const linkValue = formAddLinkInput.value;
        //отрисовка карточки
        const newCard = createCard('#tmp', nameValue, linkValue, popupGallery.openPopup);
        defaultCardList.addItem(newCard);
        //обнуление формы
        formAdd.reset();
        //закрыли форму
        cardPopup.closePopup();
    });
}

const cardPopup = new PopupWithForm('#add-card-popup', addSubmitListenerToFormAdd);
cardPopup.setEventListeners();

openCardPopupButton.addEventListener('click', () => { cardPopup.openPopup() });



// ИНФОРМАЦИЯ ОБ ПРОФАЙЛЕ -------------

// открытие попапа редактирования инфо об профайле
const aboutMeButton = document.getElementById('myBtn');
const formAbout = document.getElementById('editForm');
const formAboutNameInput = document.getElementById('nameInput');
const formAboutJobInput = document.getElementById('jobInput');

const addSubmitListenerToFormAbout = () => {
    formAbout.addEventListener('submit', (evt) => {
        //отменили действие по умолчанию
        evt.preventDefault();
        //обновили текст на странице
        userInfo.setUserInfo({ name: formAboutNameInput.value, job: formAboutJobInput.value });
        //закрыли форму
        aboutPopup.closePopup();
    });
}

const aboutPopup = new PopupWithForm('#popup-about', addSubmitListenerToFormAbout);
aboutPopup.setEventListeners();

// обновление информации об профайле
const userInfo = new UserInfo({
    nameSelector: '#name-about',
    jobSelector: '#profile-about',
})


aboutMeButton.addEventListener('click', () => {
    aboutPopup.openPopup();
    formAboutNameInput.value = userInfo.getUserInfo().name;
    formAboutJobInput.value = userInfo.getUserInfo().job;
});



// ИНИЦИАЛИЗАЦИЯ ФОРМ

const formClassSelectors = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'error_visible'
};

const formAddEx = new FormValidator(formClassSelectors, formAdd);
formAddEx.enableValidation();

const formAboutEx = new FormValidator(formClassSelectors, formAbout);
formAboutEx.enableValidation();