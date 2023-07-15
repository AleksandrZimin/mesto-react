import "../index.css";
import logo from "../images/logo.svg";

function Header() {
  return (
    <div>
      <header className="header">
        <img src={logo} alt="Место-Россия" className="header__logo" />
      </header>
    </div>
  );
}

export default Header;
