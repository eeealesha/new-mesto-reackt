import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import {PopupWithForm} from "./PopupWithForm";
import {ImagePopup} from "./ImagePopup";
import React from 'react';
import { api } from "../utils/api";
import {EditProfilePopup} from './EditProfilePopup';

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
            console.log(res)
            setCurrentUser(res);
            closeAllPopups();
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
                <Main onEditAvatar={handleEditAvatar} onAddPlace={handleAddPlaceClick}
                      onEditProfile={handleEditProfileClick} onCardClick={handleCardClick}/>
                <Footer/>
                <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
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
                <PopupWithForm onClose={closeAllPopups} isOpen={isEditAvatarPopupOpen} title='Обновить аватар'
                               name='avatar' buttonText='Сохранить' children={<>
                    <label className="form__field">
                        <input
                            type="url"
                            className="form__item form__item_el_link"
                            id="link"
                            name="link"
                            placeholder="https://somewebsite.com/someimage.jpg"
                            required
                        />
                        <div className="form__error-text" id="link-error"></div>
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
