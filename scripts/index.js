// СПИСОК КАРТОЧЕК --------------

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинск',
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
        name: 'Архангельск',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


// ОТРИСОВКА КАРТОЧЕК --------------

const cardsParent = document.getElementById('article-parent');

// функция для отрисовки одной карточки
function renderCard(name, link) {
    const innerHtml = `
    <article class="element" onclick="openPopupGallery(this)">
        <button class="element__basket" onclick="deleteCard(event, this)"></button>
        <img class="element__mask"
        src="${link}"
        alt="${name}">
        <div class="element__group">
        <h2 class="element__title">${name}</h2>
        <button class="element__like-button" type="button" onclick="acticeDisactiveLike(event, this)"></button>
        </div>
    </article>
    `;
    cardsParent.insertAdjacentHTML('beforeend', innerHtml);
}

// отрисовка карточек в цикле из массива initialCards
initialCards.forEach((element) => {
    renderCard(element.name, element.link);
})



// УДАЛЕНИЕ КАРТОЧЕК -----------
function deleteCard(event, element) {
    event.stopPropagation();
    element.parentNode.remove();
};



// ЛАЙКИ КАРТОЧЕК ------------
function acticeDisactiveLike(event, element) {
    event.stopPropagation();
    element.classList.toggle('element__like-button_active');
};



// ОТКРЫТИЕ МОДАЛЬНОЙ ГАЛЕРЕИ ---------------
const popupGallery = document.getElementById('popup-gallery');
const popupGalleryClose = document.getElementById('popup-gallery-close');
const popupGalleryImage = document.getElementById('popup-gallery-link');
const popupGalleryTitle = document.getElementById('popup-gallery-name');

function openPopupGallery(element) {
    //элемент article
    const article = element;
    //получаем элементы внутри article
    const articleTitle = article.querySelector('.element__title');
    const articleTitleText = articleTitle.textContent;
    const articleImage = article.querySelector('.element__mask');
    const articleImageLink = articleImage.src;
    //открыть попап
    popupGallery.style.visibility = 'initial';
    popupGallery.style.opacity = '1';
    //вставляем полученные данные в попап
    popupGalleryImage.src = articleImageLink;
    popupGalleryTitle.textContent = articleTitleText;
}

popupGalleryClose.addEventListener('click', () => {
    popupGallery.style.visibility = 'hidden';
    popupGallery.style.opacity = '0';
})



// ДОБАВЛЕНИЕ КАРТОЧЕК ЧЕРЕЗ ФОРМУ ---------------

const openCardPopupButton = document.getElementById('add-card');
const closeCardPopupButton = document.getElementById('close-add-card-popup');
const cardPopup = document.getElementById('add-card-popup');

openCardPopupButton.addEventListener('click', () => {
    cardPopup.style.visibility = 'initial';
    cardPopup.style.opacity = '1';
})

closeCardPopupButton.addEventListener('click', () => {
    cardPopup.style.visibility = 'hidden';
    cardPopup.style.opacity = '0';
})

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
    renderCard(nameValue, linkValue);
    //закрыли форму
    cardPopup.style.visibility = 'hidden';
    cardPopup.style.opacity = '0';
});



// ИНФОРМАЦИЯ ОБ ПРОФАЙЛЕ -------------

// открытие попапа редактирования инфо об профайле
const aboutMeButton = document.getElementById('myBtn');
const aboutPopup = document.getElementById('popup-about');
const closeAboutPopupButton = document.getElementById('close-about');

aboutMeButton.addEventListener('click', () => {
    aboutPopup.style.visibility = 'initial';
    aboutPopup.style.opacity = '1';
})

closeAboutPopupButton.addEventListener('click', () => {
    aboutPopup.style.visibility = 'hidden';
    aboutPopup.style.opacity = '0';
})

// обновление информации об профайле
const nameAbout = document.getElementById('name-about');
const profileAbout = document.getElementById('profile-about');

const formAbout = document.getElementById('editForm');
const formAboutNameInput = document.getElementById('nameInput');
const formAboutJobInput = document.getElementById('jobInput');

formAboutNameInput.value = nameAbout.textContent;
formAboutJobInput.value = profileAbout.textContent;

formAbout.addEventListener('submit', (evt) => {
    //отменили действие по умолчанию
    evt.preventDefault();
    //обновили текст на странице
    nameAbout.textContent = formAboutNameInput.value;
    profileAbout.textContent = formAboutJobInput.value;
    //закрыли форму
    aboutPopup.style.visibility = 'hidden';
    aboutPopup.style.opacity = '0';
});