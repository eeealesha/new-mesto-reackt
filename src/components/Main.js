import React from 'react';
import {api} from "../utils/api";
import {Card} from "./Card";

export default function Main(props) {
    // Создаем стейт-переменные для профиля
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    // Создаем стейт-переменные для массива карточек
    const [cards, setCards] = React.useState([])

    React.useEffect(() => {
        Promise.all([
            //в Promise.all передаем массив промисов которые нужно выполнить
            api.getUserInfo(),
            api.getInitialCards()
        ])
            .then((values) => {
                //попадаем сюда когда оба промиса будут выполнены
                const [userData, initialCards] = values;
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);
                setCards(initialCards);
                // у нас есть все нужные данные, отрисовываем страницу
            })
            .catch((err) => {
                //попадаем сюда если один из промисов завершаться ошибкой
                console.log(err);
            });
    }, [cards])

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__description">
                    <div className="profile__avatar">
                        <img
                            className="profile__picture"
                            src={userAvatar}
                            alt="Фотография Жака-Ив Кусто"
                        />
                        <button className="button botton_type_avatar" type="button"
                                onClick={props.onEditAvatar}></button>
                    </div>
                    <div className="profile__text">
                        <div className="profile__wrapper">
                            <h1 className="profile__title">{userName}</h1>
                            <button className="button button_type_edit" type="button"
                                    onClick={props.onEditProfile}></button>
                        </div>
                        <p className="profile__subtitle">{userDescription}</p>
                    </div>
                </div>
                <button className="button button_type_add" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="photo-grid">
                <ul className="photo-grid__list">
                    {cards.map((card, i) => <Card card={card} key={i} onClick={props.onCardClick}/>)}
                </ul>
            </section>
        </main>
    )
}