import {PopupWithForm} from "./PopupWithForm";
import React from "react";

export function EditAvatarPopup(props){

    const avatarRef = React.useRef(0);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    React.useEffect(() => {
        avatarRef.current.value = "";
    }, [props.isOpen]);

    return(
        <PopupWithForm onClose={props.onClose} isOpen={props.isOpen} title='Обновить аватар'
                       onSubmit={handleSubmit} name='avatar' buttonText='Сохранить' children={<>
            <label className="form__field">
                <input
                    type="url"
                    className="form__item form__item_el_link"
                    id="link"
                    name="link"
                    placeholder="https://somewebsite.com/someimage.jpg"
                    required
                    ref={avatarRef}
                />
                <div className="form__error-text" id="link-error"></div>
            </label>
        </>}/>
    )
}

