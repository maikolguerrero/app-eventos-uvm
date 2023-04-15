const eventItem = () => {
  return (
    <div className="event-list__event">
      <img src="https://uvm.mx/themes/theme-uvm/assets/images/imagenOpengraph_UVM.jpg" alt="Imagen representativa" style={{ width: "80 px" }} />
      <div className="event-list__info">
        <h3 className="event-list__element event-list__element--title">
          Titulo
        </h3>
        <span className="event-list__element">Hora</span>
        <span className="event-list__element">Lugar</span>
        <span className="event-list__element">Rating</span>
      </div>
    </div>
  );
};

export default eventItem;
