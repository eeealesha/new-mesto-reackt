import {PopupWithForm} from "./PopupWithForm";
import React from "react";

export function AddPlacePopup(props){

    const [title, setTitle]= React.useState('');
    const [link, setLink]= React.useState('');

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }
    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        props.onAddPlace({
            name: title,
            link: link
        })

    }
    React.useEffect(() => {
        setTitle("")
        setLink("")
    }, [props.isOpen]);

    return(
        <PopupWithForm onSubmit={handleSubmit} onClose={props.onClose} isOpen={props.isOpen} title='Новое место' name='add'
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
                        value={title}
                        onChange={handleTitleChange}
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
                        value={link}
                        onChange={handleLinkChange}
                    />
                    <div className="form__error-text" id="img-error"></div>
                </label>

            </>}/>

    )
}