import {useState, useEffect} from "react"
import EventItem from "./eventItem";

const eventList = (list) => {

   const [eventos, setEventos] = useState([])

   useEffect(()=> {
     console.log("list: ", list.list)
   }, [])

  return (
    // <>
    // <section class="event-list">
    //     <EventItem/>
    // </section>
    // </>
    <section className="event-list">
      <EventItem></EventItem>
    </section>
  );
};
export default eventList;
