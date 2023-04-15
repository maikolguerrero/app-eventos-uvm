import {useState, useEffect} from "react"
import EventItem from "./EventItem"; //Traemos el componente para usarlo en la función que lista el item.

const eventList = (list) => {
  
   const [eventos, setEventos] = useState([])

   useEffect(()=> { 
    console.log('list: ', list.list)
   }, [])
//retornamos div donde serán listados
  return (

    <div className="event-list__container">
      <EventItem></EventItem>
    </div>
  );
};
export default eventList;
