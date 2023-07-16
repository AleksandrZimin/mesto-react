import Vector1 from "../images/Vector(1).svg";
import Api from "../utils/Api";
import { useState, useEffect } from "react";
import Card from "./Card";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  handleCardClick,
  buttonText,
}) {
  const [userData, setUserData] = useState({
    userName: "",
    userDescription: "",
    userAvatar: "",
  });

  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([Api.getCard(), Api.getUserInfo()])
      .then(([cards, userInfomation]) => {
        const { name, about, avatar } = userInfomation;
        setUserData({
          userName: name,
          userDescription: about,
          userAvatar: avatar,
        });
        setCards(cards);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  return (
    <>
      <div>
        <main className="main">
          <section className="profile">
            <img
              src={userData.userAvatar}
              alt="Аватарка"
              className="profile__avatar"
            />
            <button className="profile__avatar-button" onClick={onEditAvatar} />
            <div className="profile__info">
              <h1 className="profile__name">{userData.userName}</h1>
              <button
                type="button"
                className="button profile__button"
                onClick={onEditProfile}
              />
              <p className="profile__job">{userData.userDescription}</p>
            </div>
            <button
              className="profile__add-button"
              type="button"
              onClick={onAddPlace}
            >
              <img src={Vector1} alt="Плюс" className="profile__add-plus" />
            </button>
          </section>
          <section className="elements">
            {cards.map((item) => (
              <Card
                key={item._id}
                item={item}
                handleCardClick={handleCardClick}
              />
            ))}
          </section>
        </main>
      </div>
    </>
  );
}

export default Main;
