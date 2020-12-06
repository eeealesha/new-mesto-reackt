import {PopupWithForm} from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from '../contex/CurrentUserContext';


export function EditProfilePopup(props) {
    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);
    // добавьте стейт-переменные name и description и привяжите их к полям ввода, сделав их управляемыми
    const [name, setName]= React.useState("");
    const [description, setDescription]= React.useState("");

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
            name,
            about: description,
        });
    }
    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    return (<PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} title='Редактировать профиль'
                           name='profile' buttonText='Сохранить' children={

        <>
            <label className="form__field">
                <input
                    type="text"
                    className="form__item form__item_el_name"
                    id="name"
                    name="name"
                    required
                    minLength="2"
                    maxLength="40"
                    value={name || ''}
                    onChange={handleNameChange}
                />
                <div className="form__error-text" id="name-error"></div>
            </label>
            <label className="form__field">
                <input
                    type="text"
                    className="form__item form__item_el_job"
                    id="job"
                    name="job"
                    required
                    minLength="2"
                    maxLength="200"
                    value={description || ''}
                    onChange={handleDescriptionChange}
                />
                <div className="form__error-text" id="job-error"></div>
            </label>
        </>}/>)
}
