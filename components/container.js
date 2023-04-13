import Head from "next/head";
import Navbar from "./navbar";
import Main from "./main";
import EventList from "./eventList";

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
          <title>Document</title>
        </>
      </Head>
      <Navbar>{props.children}</Navbar>
      <Main>{props.children}</Main>
      <EventList>{props.children}</EventList>
    </div>
  );
};
export default container;
