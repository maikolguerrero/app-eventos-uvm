import Form from "./form";

const main = (props) => {
  return (
    // <section class="agregar-evento">
    //   <h1 class="agregar-evento__h1">Nuevo evento</h1>
    //     <Form>{props.children}</Form>
    // </section>
    <section className="agregar-evento">
      <h1 className="agregar-evento__h1">Nuevo evento</h1>
      <Form>
        {"{"}props.children{"}"}
      </Form>
    </section>
  );
};
export default main;
