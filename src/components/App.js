import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import {PopupWithForm} from "./PopupWithForm";
import {ImagePopup} from "./ImagePopup";
import React from 'react';
import { api } from "../utils/api";
import {EditProfilePopup} from './EditProfilePopup';
import {EditAvatarPopup} from './EditAvatarPopup';
//Импортируйте этот объект в App и используйте его провайдер

import { CurrentUserContext } from '../contex/CurrentUserContext';


function App() {
    // Создаем стейт-переменные попапов
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false); // true или false
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false); // true или false
    const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false); // true или false
    const [isImagePopupOpen, setImagePopupOpen] = React.useState(false); // true или false
    // Создаем стейт-переменную выбранной карточки
    const [selectedCard, setSelectedCard] = React.useState(null);
    // Создайте стейт currentUser в корневом компоненте
    const [currentUser, setCurrentUser] = React.useState({});
    // Создаем стейт-переменные для массива карточек
    const [cards, setCards] = React.useState([]);


    React.useEffect(() => {
        Promise.all([
            //в Promise.all передаем массив промисов которые нужно выполнить
            api.getInitialCards()
        ])
            .then((values) => {
                //попадаем сюда когда оба промиса будут выполнены
                const [initialCards] = values;
                setCards(initialCards);
                // у нас есть все нужные данные, отрисовываем страницу
            })
            .catch((err) => {
                //попадаем сюда если один из промисов завершаться ошибкой
                console.log(err);
            });
    }, [])

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
            const newCards = cards.map((c) => c._id === card._id ? newCard : c);
            // Обновляем стейт
            setCards(newCards);
        });
    }

    function handleCardDelete(card) {
        // Снова проверяем, являемся ли мы владельцем карточки
        const isOwn = card.owner._id === currentUser._id;

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.deleteCard(card._id, !isOwn).then(() => {
            // Формируем новый массив на основе имеющегося, фильтраю по номеру карточки
            const newCards = cards.filter((c) => c._id !== card._id);
            // Обновляем стейт
            setCards(newCards);
        });
    }
    //  Эффект при монтировании, который будет вызывать api.getUserInfo и обновлять стейт-переменную из полученного значения.
    React.useEffect(() => {
        Promise.all([
            //в Promise.all передаем массив промисов которые нужно выполнить
            api.getUserInfo(),
        ])
            .then((values) => {
                //попадаем сюда когда оба промиса будут выполнены
                const [userData] = values;
                setCurrentUser(userData);
                // у нас есть все нужные данные, отрисовываем страницу
            })
            .catch((err) => {
                //попадаем сюда если один из промисов завершаться ошибкой
                console.log(err);
            });
    }, [])

    function handleCardClick(card) {
        setSelectedCard(card);
        setImagePopupOpen(true)
    }

    function handleEditAvatar() {
        setAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleUpdateUser({name, about}) {
        api.sendUserInfo(name, about).then((res)=>{
            closeAllPopups();
            setCurrentUser(res);
            }
        );
    }

    function handleUpdateAvatar({avatar}) {
        console.log(avatar)
        api.sendUserAvatar(avatar).then((res)=>{
                closeAllPopups();
                setCurrentUser(res);
            }
        );
    }

    function closeAllPopups() {
        setAvatarPopupOpen(false)
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setSelectedCard(null);
        setImagePopupOpen(false)
    }

    return (
        //«оберните» в него всё текущее содержимое корневого компонента
        //В качестве значения контекста для провайдера используйте currentUser
        <CurrentUserContext.Provider value={currentUser}>
        <div>
            <div className="page">
                <Header/>
                <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onEditAvatar={handleEditAvatar} onAddPlace={handleAddPlaceClick}
                      onEditProfile={handleEditProfileClick} onCardClick={handleCardClick}/>
                <Footer/>
                <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
                <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
                <PopupWithForm onClose={closeAllPopups} isOpen={isAddPlacePopupOpen} title='Новое место' name='add'
                               buttonText='Создать' children={
                    <>

                        <label className="form__field">
                            <input
                                type="text"
                                className="form__item form__item_el_place"
                                id="place"
                                name="place"
                                placeholder="Название"
                                required
                                minLength="1"
                                maxLength="30"
                            />
                            <div className="form__error-text" id="place-error"></div>
                        </label>
                        <label className="form__field">
                            <input
                                type="url"
                                className="form__item form__item_el_img"
                                id="img"
                                name="img"
                                placeholder="Ссылка на картинку"
                                required
                            />
                            <div className="form__error-text" id="img-error"></div>
                        </label>

                    </>}/>
                <PopupWithForm onClose={closeAllPopups} title='Вы уверены?' name='confirm' buttonText='Да'/>
                <ImagePopup onClose={closeAllPopups} isOpen={isImagePopupOpen} card={selectedCard}/>
            </div>


        </div>
            </CurrentUserContext.Provider>
    );
}

export default App;
