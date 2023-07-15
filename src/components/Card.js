import deleteItem from "../images/delete.svg";

function Card({ item, handleCardClick }) {
  const handleClick = () => {
    handleCardClick(item);
  };
  return (
    <>
      <div>
        <article className="element" id="element">
          <img
            src={item.link}
            alt={item.name}
            className="element__image"
            onClick={handleClick}
          />
          <div className="element__place">
            <h2 className="element__title">{item.name}</h2>
            <div className="elements__like">
              <button type="button" className="element__icon button"></button>
              <span className="element__number">{item.likes.length}</span>
            </div>
          </div>
          <img src={deleteItem} alt="Удаление" className="element__delete" />
        </article>
      </div>
    </>
  );
}
export default Card;
