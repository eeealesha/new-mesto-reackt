import {CurrentUserContext} from '../contex/CurrentUserContext';
import React from "react";

export function Card(props) {
    // Подписываемся на контекст
    const currentUser = React.useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner._id === currentUser._id;
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `button button_type_delete ${isOwn ? '' : 'button_hidden'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `button button_type_like ${isLiked ? 'button_liked' : ''}`;

    return (
        <li className="card__element">
            <div className="card">
                <button className={cardDeleteButtonClassName} type="button"></button>
                <img
                    className="photo-grid__item"
                    src={props.card.link}
                    alt="Картинка, которая иллюстрирует название"
                    onClick={() => props.onClick(props.card)}
                />
                <div className="photo-grid__caption">
                    <h2 className="photo-grid__title">{props.card.name}</h2>
                    <div className="photo-grid__wrapper">
                        <button onClick={() => props.onCardLike(props.card)} className={cardLikeButtonClassName} type="button"></button>
                        <span className="photo-grid__like-counter">{props.card.likes.length}</span>
                    </div>
                </div>
            </div>
        </li>
    )
}