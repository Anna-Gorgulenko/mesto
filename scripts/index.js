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
    openPopup(popupGallery);
    //вставляем полученные данные в попап
    popupGalleryImage.src = articleImageLink;
    popupGalleryTitle.textContent = articleTitleText;
}

popupGalleryClose.addEventListener('click', () => { closePopup(popupGallery) });



// ОТРИСОВКА КАРТОЧЕК --------------

const cardsParent = document.getElementById('article-parent');

// отрисовка карточек в цикле из массива initialCards
const reversedInitialCards = initialCards.reverse();
reversedInitialCards.forEach((element) => {
    renderCard(element.name, element.link);
})

function renderCard(name, link) {
    const template = document.getElementById('tmp');
    const div = document.createElement('div');
    div.appendChild(template.content.cloneNode(true));
    //карточка
    const article = div.querySelector('.element');
    article.addEventListener('click', () => { openPopupGallery(article) });
    //задаём src для картинки
    const image = article.querySelector('.element__mask');
    image.src = link;
    image.alt = link;
    //вставляем текст в заголовок
    const title = article.querySelector('.element__title');
    title.textContent = name;
    //кнопка удаления карточки
    const basketBtn = article.querySelector('.element__basket');
    basketBtn.addEventListener('click', (evt) => {
        evt.stopPropagation();
        basketBtn.parentNode.remove();
    })
    //кнопка лайка карточки
    const likeBtn = article.querySelector('.element__like-button');
    likeBtn.addEventListener('click', (evt) => {
        evt.stopPropagation();
        likeBtn.classList.toggle('element__like-button_active');
    });
    //вставка карточки в разметку
    cardsParent.prepend(article);
}



// ДОБАВЛЕНИЕ КАРТОЧЕК ЧЕРЕЗ ФОРМУ ---------------

const openCardPopupButton = document.getElementById('add-card');
const closeCardPopupButton = document.getElementById('close-add-card-popup');
const cardPopup = document.getElementById('add-card-popup');

openCardPopupButton.addEventListener('click', () => { openPopup(cardPopup) });

closeCardPopupButton.addEventListener('click', () => { closePopup(cardPopup) });

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
    //обнуление формы
    formAdd.reset();
    //закрыли форму
    closePopup(cardPopup);
});



// ИНФОРМАЦИЯ ОБ ПРОФАЙЛЕ -------------

// открытие попапа редактирования инфо об профайле
const aboutMeButton = document.getElementById('myBtn');
const aboutPopup = document.getElementById('popup-about');
const closeAboutPopupButton = document.getElementById('close-about');

aboutMeButton.addEventListener('click', () => { openPopup(aboutPopup) });

closeAboutPopupButton.addEventListener('click', () => { closePopup(aboutPopup) });

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
    closePopup(aboutPopup);
});



// ФУНКЦИИ ОТКРЫТИЯ/ЗАКРЫТИЯ ПОПАПОВ

function openPopup(element) {
    element.classList.add('popup_opened')
}

function closePopup(element) {
    element.classList.remove('popup_opened')
}