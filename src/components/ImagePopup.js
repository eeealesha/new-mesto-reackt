import React from "react";

export function ImagePopup(props) {
    return (
        <div className={`popup popup_type_fig ${!!(props.card) ? 'popup_opened' : ''}`}>
            <figure className="popup__figure">
                <button className="button button_type_close" type="button" onClick={props.onClose}></button>
                <img
                    className="popup__img"
                    src={props.card ? props.card.link : ''}
                    alt={props.card ? `Картинка с изображением ${props.card.name}` : ''}
                />
                <figcaption
                    className="popup__figcaption popup__figcaption-text">{props.card ? props.card.name : ''}</figcaption>
                <figcaption
                    className="popup__figcaption popup__figcaption-owner">{props.card ? props.card.owner.name : ''}</figcaption>
                <figcaption
                    className="popup__figcaption popup__figcaption-date">{props.card ? props.card.createdAt : ''}</figcaption>
                <figcaption className="popup__figcaption popup__figcaption-who">Кому нравится?</figcaption>
                <figcaption
                    className="popup__figcaption popup__figcaption-likes">{props.card ? props.card.likes.map((like, i) =>
                    <div key={i}>{like.name}</div>) : ""}</figcaption>
            </figure>
        </div>
    );
}