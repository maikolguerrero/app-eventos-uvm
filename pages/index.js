import Head from 'next/head'
import Container from '../components/container'
import EventList from '../components/eventList'
import Form from '../components/form'
import Navbar from '../components/navbar'
import API from '../util/const'
import _fetch from 'isomorphic-fetch'

const index = (props) => {
    //console.log(props)
    console.log(props)
    return (
        <Container>
            <Head>
                <title>Form</title>
            </Head>
            <Navbar/>
            <Form/>
            <EventList list = {props}/>
        </Container>
    )
}

index.getInitialProps = async () => {
    const res = await _fetch(`${API.URI}/eventos/getInicializationData`)
    const data = res.json()
    return data
}

export default index