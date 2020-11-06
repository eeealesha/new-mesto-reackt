export function Card(props) {
    return (
        <li className="card__element">
            <div className="card">
                <button className="button button_type_delete" type="button"></button>
                <img
                    className="photo-grid__item"
                    src={props.card.link}
                    alt="Картинка, которая иллюстрирует название"
                    onClick={() => props.onClick(props.card)}
                />
                <div className="photo-grid__caption">
                    <h2 className="photo-grid__title">{props.card.name}</h2>
                    <div className="photo-grid__wrapper">
                        <button className="button button_type_like" type="button"></button>
                        <span className="photo-grid__like-counter">{props.card.likes.length}</span>
                    </div>
                </div>
            </div>
        </li>
    )
}