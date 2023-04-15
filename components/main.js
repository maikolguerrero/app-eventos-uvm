import Form from "./Form"; //traemos el formulario

const main = (props) => {
  return (
    <>
    <section className="agregar-evento">
      <h1 className="agregar-evento__h1">Nuevo evento</h1>
      <Form>
        {props.children}
      </Form>
    </section>

    <section className="event-list">
      {props.children}
    </section>
    </>
  );
};
export default main;
