import Head from "next/head";
import Main from "./Main"; //usamos main dentro del contenedor


const container = (props) => {
  return (
    <div>
      <Head>
        {/* <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title> */}
        <>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Form</title>
        </>
      </Head>
      {/* Las propiedades que vienen de index pasan a main(props) */}
      <Main>{props.children}</Main> 
    </div>
  );
};
export default container;
