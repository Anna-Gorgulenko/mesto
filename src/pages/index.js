import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, formClassSelectors } from "../utils/constants.js";
import './index.css'


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

const submitHandlerToFormAdd = (evt, data) => {
    //отменили действие по умолчанию
    evt.preventDefault();
    //отрисовка карточки
    const newCard = createCard('#tmp', data[ formAddNameInput.getAttribute('name') ], data[ formAddLinkInput.getAttribute('name') ], popupGallery.openPopup);
    defaultCardList.addItem(newCard);
    //закрыли форму
    cardPopup.closePopup();
};

const cardPopup = new PopupWithForm('#add-card-popup', submitHandlerToFormAdd);
cardPopup.setEventListeners();

openCardPopupButton.addEventListener('click', () => { cardPopup.openPopup() });



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
    userInfo.setUserInfo({ name: data[ formAboutNameInput.getAttribute('name') ], job: data[ formAboutJobInput.getAttribute('name') ] });
    //закрыли форму
    aboutPopup.closePopup();
};


const aboutPopup = new PopupWithForm('#popup-about', submitHandlerToFormAbout);
aboutPopup.setEventListeners();

// обновление информации об профайле
const userInfo = new UserInfo({
    nameSelector: '#name-about',
    jobSelector: '#profile-about',
})


aboutMeButton.addEventListener('click', () => {
    aboutPopup.openPopup();
    const {job, name} = userInfo.getUserInfo()
    formAboutNameInput.value = name;
    formAboutJobInput.value = job;
});



// ИНИЦИАЛИЗАЦИЯ ФОРМ

const formAddEx = new FormValidator(formClassSelectors, formAdd);
formAddEx.enableValidation();

const formAboutEx = new FormValidator(formClassSelectors, formAbout);
formAboutEx.enableValidation();