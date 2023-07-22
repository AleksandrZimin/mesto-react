import { useRef, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const [avatarUrl, setAvatarUrl] = useState("");
  const updateAvatarRef = useRef();

  useEffect(() => {
    if (!isOpen) {
      setAvatarUrl(""); // Очищаем значение при закрытии попапа
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar({
      avatar: updateAvatarRef.current.value,
    });
    setAvatarUrl(""); // Очищаем значение после успешного обновления аватара
  };

  const handleInputChange = (e) => {
    setAvatarUrl(e.target.value);
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
        value={avatarUrl}
        onChange={handleInputChange}
      />
      <span id="avatar-error" className="popup-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
