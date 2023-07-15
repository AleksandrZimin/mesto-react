// import "../index.css";
// import {React} from "react";

function PopupWithForm({ name, title, children, isOpen, onClose }) {
  return (
    <div className={`popup ${name}-popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form" name={name} noValidate>
          {children}
          <button class="form__button" type="submit">
            Сохранить
          </button>
        </form>
        <button
          type="button"
          className="button popup__close"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
// popup_type_${props.name}