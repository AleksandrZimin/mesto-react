import { useState, useEffect } from "react";
import Card from "./Card.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard([]);
  };

  return (
    <div className="App">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        handleCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        name="profile"
        title="Редактировать профиль"
        buttonText="Сохранить"
        // onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          class="form__input form__input_place_name"
          placeholder="Имя"
          required
          minLength="2"
          maxLength="40"
        />
        <span id="name-error" class="popup-error"></span>
        <input
          type="text"
          name="job"
          class="form__input form__input_place_job"
          placeholder="О себе"
          required
          minLength="2"
          maxLength="200"
        />
        <span id="job-error" class="popup-error"></span>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        name="avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
        // onSubmit={handleSubmit}
      >
        <input
          type="url"
          name="avatar"
          className="form__input"
          placeholder="Ссылка на картинку"
          required
        />
        <span id="avatar-error" className="popup-error"></span>
      </PopupWithForm>

      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        name="card"
        title="Новое место"
        buttonText="Создать"
        // onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="title"
          class="form__input form__input_place_title"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
        />
        <span id="title-error" class="popup-error"></span>
        <input
          type="url"
          name="url"
          class="form__input form__input_place_url"
          placeholder="Ссылка на картинку"
          required
        />
        <span id="url-error" class="popup-error"></span>
      </PopupWithForm>

      <ImagePopup onClose={closeAllPopups} card={selectedCard} />
    </div>
  );
}

export default App;
