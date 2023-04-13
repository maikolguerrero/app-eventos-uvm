const Navbar = () => {
  return (
    // <>
    // <header class="header">
    // <div class="header__logo-div">
    //     <img src="Logo_UVM.png" alt="Logo de la UVM" class="header__logo"/><span class="header__logo-lettering">UNIVERSIDAD</span>
    // </div>
    // <ul class="header__options">
    //     <li class="header__options"><a href="#" class="header__link">option</a></li>
    //     <li class="header__options"><a href="#" class="header__link">option</a></li>
    //     <li class="header__options"><a href="#" class="header__link">option</a></li>
    //     <li class="header__options"><a href="#" class="header__link">option</a></li>
    //     <li class="header__options"><a href="#" class="header__link">option</a></li>
    // </ul>
    // <div class="header__menu">
    //     <div class="header__desk-btn">
    //         <button class="header__log-in">Iniciar sesión</button>
    //     <button class="header__sign-up">Registrarse</button>
    //     </div>
    //     <button class="header__button">
    //         <span class="header__lines"></span>
    //         <span class="header__lines"></span>
    //     </button>
    // </div>
    // </header>
    // </>
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
