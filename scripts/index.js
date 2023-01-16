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

// находим все крестики проекта по универсальному селектору
const closeButtons = document.querySelectorAll('.popup__close');

closeButtons.forEach((button) => {
    // находим 1 раз ближайший к крестику попап 
    const popup = button.closest('.popup');
    // устанавливаем обработчик закрытия на крестик
    button.addEventListener('click', () => closePopup(popup));
});


// ЗАКРЫТИЕ ПОПАПА КЛИКОМ НА ОВЕРЛЕЙ
const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup')) {
            closePopup(popup);
        }
    })
})


// ОТРИСОВКА КАРТОЧЕК --------------

const cardsParent = document.getElementById('elements-article');

// отрисовка карточек в цикле из массива initialCards
const reversedInitialCards = initialCards.reverse();
reversedInitialCards.forEach((element) => {
    cardsParent.prepend(createCard(element.name, element.link));
})

function createCard(name, link) {
    const template = document.getElementById('tmp');
    const article = template.content.cloneNode(true).querySelector('.element');
    //карточка
    const image = article.querySelector('.element__mask');
    image.src = link;
    image.alt = name;
    image.addEventListener('click', () => { openPopupGallery(article) });
    //вставляем текст в заголовок
    const title = article.querySelector('.element__title');
    title.textContent = name;
    //кнопка удаления карточки
    const basketBtn = article.querySelector('.element__basket');
    basketBtn.addEventListener('click', (evt) => {
        // basketBtn.parentNode.remove();
        article.remove();
    })
    //кнопка лайка карточки
    const likeBtn = article.querySelector('.element__like-button');
    likeBtn.addEventListener('click', (evt) => {
        likeBtn.classList.toggle('element__like-button_active');
    });
    //возвращаем карточку
    return article;
}



// ДОБАВЛЕНИЕ КАРТОЧЕК ЧЕРЕЗ ФОРМУ ---------------

const openCardPopupButton = document.getElementById('add-card');
const cardPopup = document.getElementById('add-card-popup');

openCardPopupButton.addEventListener('click', () => { openPopup(cardPopup) });

const formAdd = document.getElementById('addForm');
const formAddNameInput = document.getElementById('nameInputNew');
const formAddLinkInput = document.getElementById('linkInputNew');

formAdd.addEventListener('submit', (evt) => {
    //отменили действие по умолчанию
    //evt.preventDefault();
    //получение значений формы
    const nameValue = formAddNameInput.value;
    const linkValue = formAddLinkInput.value;
    //отрисовка карточки
    cardsParent.prepend(createCard(nameValue, linkValue));
    //обнуление формы
    formAdd.reset();
    //закрыли форму
    closePopup(cardPopup);
});



// ИНФОРМАЦИЯ ОБ ПРОФАЙЛЕ -------------

// открытие попапа редактирования инфо об профайле
const aboutMeButton = document.getElementById('myBtn');
const aboutPopup = document.getElementById('popup-about');

aboutMeButton.addEventListener('click', () => { openPopup(aboutPopup) });

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

function escapePopupClose(element) {
    return (event) => {
        if (event.key === "Escape") {
            closePopup(element)
        }
    }
}

function openPopup(element) {
    element.classList.add('popup_opened')
    document.addEventListener('keydown', escapePopupClose(element))
}

function closePopup(element) {
    element.classList.remove('popup_opened')
    document.removeEventListener('keydown', escapePopupClose)
}