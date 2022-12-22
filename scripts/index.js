// Находим форму в DOM
// Воспользуйтесь методом querySelector()
const formElement = document.querySelector('.popup__form');
// Воспользуйтесь инструментом .querySelector()
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_job');

const editBtn = document.querySelector('.profile__edit-button');
const closeBtn = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
const profTitle = document.querySelector('.profile__title');
const profParag = document.querySelector('.profile__subtitle');


// Обработчик «открытия» формы
function openPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = profTitle.textContent;
    jobInput.value = profParag.textContent;
}

// Обработчик «закрытия» формы
function closePopup() {
    popup.classList.remove('popup_opened');
    console.log(closeBtn);
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault();
    profTitle.textContent = nameInput.value;
    profParag.textContent = jobInput.value;
    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “click” - «открытие»
editBtn.addEventListener('click', openPopup);
// он будет следить за событием “click” - «закрытие»
closeBtn.addEventListener('click', closePopup);
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit);