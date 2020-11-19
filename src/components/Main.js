import React from 'react';
import {api} from "../utils/api";
import {Card} from "./Card";
import {CurrentUserContext} from '../contex/CurrentUserContext';

export default function Main(props) {

    // Создаем стейт-переменные для массива карточек
    const [cards, setCards] = React.useState([]);
    // Подписываемся на контекст
    const currentUser = React.useContext(CurrentUserContext);

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
            // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
            const newCards = cards.filter((c) => c._id !== card._id);
            // Обновляем стейт
            setCards(newCards);
        });
    }


    return (
        <main className="content">
            <section className="profile">
                <div className="profile__description">
                    <div className="profile__avatar">
                        <img
                            className="profile__picture"
                            src={currentUser.avatar}
                            alt="Фотография Жака-Ив Кусто"
                        />
                        <button className="button botton_type_avatar" type="button"
                                onClick={props.onEditAvatar}></button>
                    </div>
                    <div className="profile__text">
                        <div className="profile__wrapper">
                            <h1 className="profile__title">{currentUser.name}</h1>
                            <button className="button button_type_edit" type="button"
                                    onClick={props.onEditProfile}></button>
                        </div>
                        <p className="profile__subtitle">{currentUser.about}</p>
                    </div>
                </div>
                <button className="button button_type_add" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="photo-grid">
                <ul className="photo-grid__list">
                    {cards.map((card, i) => <Card card={card} key={i} onClick={props.onCardClick}
                                                  onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>)}
                </ul>
            </section>
        </main>
    )
}