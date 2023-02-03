import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

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
const popupGallery = document.getElementById('popup-gallery');
// const popupGalleryClose = document.getElementById('popup-gallery-close');
const popupGalleryImage = document.getElementById('popup-gallery-link');
const popupGalleryTitle = document.getElementById('popup-gallery-name');


function openPopupGallery(name, link) {
    //открыть попап
    openPopup(popupGallery);
    //вставляем полученные данные в попап
    popupGalleryImage.src = link;
    popupGalleryImage.alt = name;
    popupGalleryTitle.textContent = name;
}


// ЗАКРЫТИЕ ПОПАПА КЛИКОМ НА ОВЕРЛЕЙ
const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__close')) {
            closePopup(popup)
        }
    })
})


// ОТРИСОВКА КАРТОЧЕК --------------

const cardsParent = document.getElementById('elements-article');

const createCard = (tmp, name, link, func) => {
    return new Card(tmp, name, link, func).generateCard();
}

// отрисовка карточек в цикле из массива initialCards
const reversedInitialCards = initialCards.reverse();
reversedInitialCards.forEach((element) => {
    const newCard = createCard('#tmp', element.name, element.link, openPopupGallery);
    cardsParent.prepend(newCard);
})


// ДОБАВЛЕНИЕ КАРТОЧЕК ЧЕРЕЗ ФОРМУ ---------------

const openCardPopupButton = document.getElementById('add-card');
const cardPopup = document.getElementById('add-card-popup');

openCardPopupButton.addEventListener('click', () => { openPopup(cardPopup) });

const formAdd = document.getElementById('addForm');
const formAddNameInput = document.getElementById('nameInputNew');
const formAddLinkInput = document.getElementById('linkInputNew');

formAdd.addEventListener('submit', (evt) => {
    //отменили действие по умолчанию
    evt.preventDefault();
    //получение значений формы
    const nameValue = formAddNameInput.value;
    const linkValue = formAddLinkInput.value;
    //отрисовка карточки
    const newCard = createCard('#tmp', nameValue, linkValue, openPopupGallery);
    cardsParent.prepend(newCard);
    //обнуление формы
    formAdd.reset();
    //закрыли форму
    closePopup(cardPopup);
});



// ИНФОРМАЦИЯ ОБ ПРОФАЙЛЕ -------------

// открытие попапа редактирования инфо об профайле
const aboutMeButton = document.getElementById('myBtn');
const aboutPopup = document.getElementById('popup-about');

aboutMeButton.addEventListener('click', () => { 
    openPopup(aboutPopup);
    formAboutNameInput.value = nameAbout.textContent;
    formAboutJobInput.value = profileAbout.textContent;
});

// обновление информации об профайле
const nameAbout = document.getElementById('name-about');
const profileAbout = document.getElementById('profile-about');

const formAbout = document.getElementById('editForm');
const formAboutNameInput = document.getElementById('nameInput');
const formAboutJobInput = document.getElementById('jobInput');

formAbout.addEventListener('submit', (evt) => {
    //отменили действие по умолчанию
    evt.preventDefault();
    //обновили текст на странице
    nameAbout.textContent = formAboutNameInput.value;
    profileAbout.textContent = formAboutJobInput.value;
    //закрыли форму
    closePopup(aboutPopup);
});



// ФУНКЦИИ ОТКРЫТИЯ/ЗАКРЫТИЯ ПОПАПОВ

function closeByEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function openPopup(element) {
    element.classList.add('popup_opened')
    document.addEventListener('keydown', closeByEscape)
}

function closePopup(element) {
    element.classList.remove('popup_opened')
    document.removeEventListener('keydown', closeByEscape)
}


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