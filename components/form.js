const form = () => {
  return (
    // <>
    //   <form action="" class="form">
    //     <p class="form__explain">
    //       Introduce información necesaria para ingresar un nuevo evento
    //     </p>
    //     <fieldset class="form__fieldset">
    //       <div class="form__div">
    //         <label
    //           for="event-title"
    //           class="form__label form__label--event-title"
    //         >
    //           Título del evento
    //         </label>
    //         <input
    //           type="text"
    //           id="event-title"
    //           placeholder="Título del evento"
    //           class="form__input form__input--bar"
    //         />
    //       </div>
    //       <div class="form__div">
    //         <label for="manager" class="form__label--manager form__label">
    //           Organizador
    //         </label>
    //         <input
    //           type="text"
    //           id="manager"
    //           placeholder="Organizador"
    //           class="form__input form__input--bar"
    //         />
    //       </div>

    //       <div class="form__div">
    //         <label
    //           for="collaborators"
    //           class="form__label--collaborators form__label"
    //         >
    //           Participantes
    //         </label>
    //         <input
    //           type="text"
    //           id="collaborators"
    //           placeholder="Participantes"
    //           class="form__input form__input--bar"
    //         />
    //       </div>

    //       <div class="form__div">
    //         <label for="place" class="form__label form__label--place">
    //           Lugar
    //         </label>
    //         <input
    //           type="text"
    //           id="place"
    //           placeholder="Lugar"
    //           class="form__input form__input--bar "
    //         />
    //       </div>

    //       <div class="form__div form__div--date ">
    //         <label for="date" class="form__label">
    //           Fecha
    //         </label>
    //         <input
    //           type="datetime-local"
    //           id="date"
    //           class="form__input form__input--date"
    //         />
    //       </div>

    //       <div class="form__div form__div--selects">
    //         <label for="date" class="form__label">
    //           Tipo
    //         </label>
    //         <select name="" id="date" class="form__select">
    //           <option value="valor1" class="form__option" name="selected">
    //             Valor 1
    //           </option>
    //           <option value="valor1" class="form__option">
    //             Valor 1
    //           </option>
    //           <option value="valor1" class="form__option">
    //             Valor 1
    //           </option>
    //         </select>
    //       </div>

    //       <div class="form__div form__div--tickets">
    //         <div class="form__num-tickets">
    //           <label for="tickets" class="form__label">
    //             Boletos disponibles
    //           </label>
    //           <input
    //             type="number"
    //             id="tickets"
    //             class="form__input form__input--tickets"
    //           />
    //         </div>
    //         <div class="form__checkboxes--tickets">
    //           <div class="form__checkbox">
    //             <input
    //               type="checkbox"
    //               class="form__input form__input--tickets-check"
    //               id="vip-ticket"
    //             />
    //             <label for="vip-ticket" class="form__label">
    //               VIP
    //             </label>
    //           </div>
    //           <div class="form__checkbox">
    //             <input
    //               type="checkbox"
    //               class="form__input form__input--tickets-check"
    //               id="backstage-ticket"
    //             />
    //             <label for="backstage-ticket" class="form__label">
    //               Tras vestidores
    //             </label>
    //           </div>
    //           <div class="form__checkbox">
    //             <input
    //               type="checkbox"
    //               class="form__input form__input--tickets-check"
    //               id="firts-line-ticket"
    //             />
    //             <label for="firts-line-ticket" class="form__label">
    //               Primera fila
    //             </label>
    //           </div>
    //         </div>
    //       </div>

    //       <div class="form__div form__div--seats">
    //         <label for="seats" class="form__label">
    //           Asientos disponibles
    //         </label>
    //         <input
    //           type="number"
    //           id="seats"
    //           class="form__input form__input--seats"
    //         />
    //       </div>

    //       <div class="form__div form__div--textarea">
    //         <label
    //           for="description"
    //           class="form__label form__label--textarea "
    //         ></label>
    //         <textarea
    //           class="form__textarea"
    //           id="description"
    //           placeholder="Descripción"
    //         ></textarea>
    //       </div>

    //       <div class="form__div form__div--selects">
    //         <label for="age-limit" class="form__label">
    //           Limite de edad
    //         </label>
    //         <select name="age-limit" id="age-limit" class="form__select">
    //           <option value="all-ages" name="selected" class="form__option">
    //             Todas las edades
    //           </option>
    //           <option value="only-adults" class="form__option">
    //             Solo mayores de edad
    //           </option>
    //         </select>
    //       </div>

    //       <div class="form__div form__div--duration">
    //         <label for="duration" class="form__label">
    //           Duración
    //         </label>
    //         <input
    //           type="time"
    //           id="duration"
    //           class="form__input form__input--duration"
    //         />
    //       </div>

    //       <div class="form__div form__img">
    //         <div class="form__showimg"></div>
    //         <div class="form__img--inputs">
    //           <label for="img" class="form__label">
    //             Introduce una imagen representativa del evento.
    //           </label>
    //           <input
    //             type="file"
    //             id="img"
    //             class="form__input form__input--img"
    //             accept="image/png, image/jpeg"
    //           />
    //         </div>
    //       </div>
    //     </fieldset>
    //   </form>
    //   <div class="form__div form__div--button-container">
    //     <button class="form__input form__input--button ">Publicar</button>
    //   </div>
    // </>

    <>
  &lt;&gt;
  <form action="" className="form">
    <p className="form__explain">
      Introduce información necesaria para ingresar un nuevo evento
    </p>
    <fieldset className="form__fieldset">
      <div className="form__div">
        <label
          htmlFor="event-title"
          className="form__label form__label--event-title"
        >
          Título del evento
        </label>
        <input
          type="text"
          id="event-title"
          placeholder="Título del evento"
          className="form__input form__input--bar"
        />
      </div>
      <div className="form__div">
        <label htmlFor="manager" className="form__label--manager form__label">
          Organizador
        </label>
        <input
          type="text"
          id="manager"
          placeholder="Organizador"
          className="form__input form__input--bar"
        />
      </div>
      <div className="form__div">
        <label
          htmlFor="collaborators"
          className="form__label--collaborators form__label"
        >
          Participantes
        </label>
        <input
          type="text"
          id="collaborators"
          placeholder="Participantes"
          className="form__input form__input--bar"
        />
      </div>
      <div className="form__div">
        <label htmlFor="place" className="form__label form__label--place">
          Lugar
        </label>
        <input
          type="text"
          id="place"
          placeholder="Lugar"
          className="form__input form__input--bar "
        />
      </div>
      <div className="form__div form__div--date ">
        <label htmlFor="date" className="form__label">
          Fecha
        </label>
        <input
          type="datetime-local"
          id="date"
          className="form__input form__input--date"
        />
      </div>
      <div className="form__div form__div--selects">
        <label htmlFor="date" className="form__label">
          Tipo
        </label>
        <select name="" id="date" className="form__select">
          <option value="valor1" className="form__option" name="selected">
            Valor 1
          </option>
          <option value="valor1" className="form__option">
            Valor 1
          </option>
          <option value="valor1" className="form__option">
            Valor 1
          </option>
        </select>
      </div>
      <div className="form__div form__div--tickets">
        <div className="form__num-tickets">
          <label htmlFor="tickets" className="form__label">
            Boletos disponibles
          </label>
          <input
            type="number"
            id="tickets"
            className="form__input form__input--tickets"
          />
        </div>
        <div className="form__checkboxes--tickets">
          <div className="form__checkbox">
            <input
              type="checkbox"
              className="form__input form__input--tickets-check"
              id="vip-ticket"
            />
            <label htmlFor="vip-ticket" className="form__label">
              VIP
            </label>
          </div>
          <div className="form__checkbox">
            <input
              type="checkbox"
              className="form__input form__input--tickets-check"
              id="backstage-ticket"
            />
            <label htmlFor="backstage-ticket" className="form__label">
              Tras vestidores
            </label>
          </div>
          <div className="form__checkbox">
            <input
              type="checkbox"
              className="form__input form__input--tickets-check"
              id="firts-line-ticket"
            />
            <label htmlFor="firts-line-ticket" className="form__label">
              Primera fila
            </label>
          </div>
        </div>
      </div>
      <div className="form__div form__div--seats">
        <label htmlFor="seats" className="form__label">
          Asientos disponibles
        </label>
        <input
          type="number"
          id="seats"
          className="form__input form__input--seats"
        />
      </div>
      <div className="form__div form__div--textarea">
        <label
          htmlFor="description"
          className="form__label form__label--textarea "
        />
        <textarea
          className="form__textarea"
          id="description"
          placeholder="Descripción"
          defaultValue={""}
        />
      </div>
      <div className="form__div form__div--selects">
        <label htmlFor="age-limit" className="form__label">
          Limite de edad
        </label>
        <select name="age-limit" id="age-limit" className="form__select">
          <option value="all-ages" name="selected" className="form__option">
            Todas las edades
          </option>
          <option value="only-adults" className="form__option">
            Solo mayores de edad
          </option>
        </select>
      </div>
      <div className="form__div form__div--duration">
        <label htmlFor="duration" className="form__label">
          Duración
        </label>
        <input
          type="time"
          id="duration"
          className="form__input form__input--duration"
        />
      </div>
      <div className="form__div form__img">
        <div className="form__showimg" />
        <div className="form__img--inputs">
          <label htmlFor="img" className="form__label">
            Introduce una imagen representativa del evento.
          </label>
          <input
            type="file"
            id="img"
            className="form__input form__input--img"
            accept="image/png, image/jpeg"
          />
        </div>
      </div>
    </fieldset>
  </form>
  <div className="form__div form__div--button-container">
    <button className="form__input form__input--button ">Publicar</button>
  </div>
</>

  );
};
export default form