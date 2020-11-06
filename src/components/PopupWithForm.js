export function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <form className="popup__container" name={`${props.name}`} noValidate>
                <button className="button button_type_close" type="button" onClick={props.onClose}></button>
                <h2 className="popup__title">{props.title}</h2>
                {props.children}
            </form>
        </div>
    );
}