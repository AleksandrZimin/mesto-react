import { useState, useEffect } from "react";
import Api from "../utils/Api";
import Card from "./Card.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({
    userName: "",
    userDescription: "",
    userAvatar: "",
    _id: "",
  });

  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([Api.getCard(), Api.getUserInfo()])
      .then(([cards, userInfomation]) => {
        const { name, about, avatar, _id } = userInfomation;
        setCurrentUser({
          userName: name,
          userDescription: about,
          userAvatar: avatar,
          _id,
        });
        setCards(cards);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

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

  const updateUser = (userData) => {
    Api.editProfile(userData).then((newUserData) => {
      setCurrentUser({
        userName: newUserData.name,
        userDescription: newUserData.about,
        userAvatar: newUserData.avatar,
        _id: newUserData._id,
      });
      closeAllPopups();
    });
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard([]);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((user) => {
      return currentUser._id === user._id;
    });
    Api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((cards) =>
        cards.map((item) => (item._id === card._id ? newCard : item))
      );
    });
  };

  const handleDeleteCard = (card) => {
    Api.deleteCard(card._id).then((deletedCard) => {
      setCards((cards) => {
        cards.filter((item) => item._id !== deletedCard._id);
      });
    });
  };

  const onUpdateAvatar = (avatarData) => {
    Api.updateAvatar(avatarData).then((newUserData) => {
      setCurrentUser({
        userName: newUserData.name,
        userDescription: newUserData.about,
        userAvatar: newUserData.avatar,
        _id: newUserData._id,
      });
      closeAllPopups();
    });
  };

  const onAddPlace = (cardData) => {
    Api.addNewCard(cardData).then((newCardData) => {
      setCards([newCardData, ...cards]);
      closeAllPopups();
    });
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          handleCardClick={handleCardClick}
          cards={cards}
          handleCardLike={handleCardLike}
          handleDeleteCard={handleDeleteCard}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          updateUser={updateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={onUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={onAddPlace}
        />

        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
