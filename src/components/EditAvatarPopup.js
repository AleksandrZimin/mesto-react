import { useState, useEffect, useContext, useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";
import CurrentUserContext from "../contexts/CurrentUserContext.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const updateAvatarRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: updateAvatarRef.current.value,
    });
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        name="avatar"
        className="form__input"
        placeholder="Ссылка на картинку"
        required
        ref={updateAvatarRef}
      />
      <span id="avatar-error" className="popup-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
