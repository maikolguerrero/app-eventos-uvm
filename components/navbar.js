//traemso el nav. En formato JSX

const Navbar = () => {
  return (
    <header className="header">
      <div className="header__logo-div">
        <img src="Logo_UVM.png" alt="Logo de la UVM" className="header__logo" />
        <span className="header__logo-lettering">UNIVERSIDAD</span>
      </div>
      <ul className="header__options">
        <li className="header__options">
          <a href="#" className="header__link">
            option
          </a>
        </li>
        <li className="header__options">
          <a href="#" className="header__link">
            option
          </a>
        </li>
        <li className="header__options">
          <a href="#" className="header__link">
            option
          </a>
        </li>
        <li className="header__options">
          <a href="#" className="header__link">
            option
          </a>
        </li>
        <li className="header__options">
          <a href="#" className="header__link">
            option
          </a>
        </li>
      </ul>
      <div className="header__menu">
        <div className="header__desk-btn">
          <button className="header__log-in">Iniciar sesión</button>
          <button className="header__sign-up">Registrarse</button>
        </div>
        <button className="header__button">
          <span className="header__lines" />
          <span className="header__lines" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
