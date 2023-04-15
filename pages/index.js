import Head from 'next/head'
import Container from '../components/Container'
import EventList from '../components/EventList'
import Form from '../components/Form'
import Navbar from '../components/Navbar'
import API from '../util/const'
import _fetch from 'isomorphic-fetch'
import { useState } from 'react'

const index = (props) => {
    console.log(props)
    return (
        <Container>
            <Head>
                {/* <title>Form</title> */}
            </Head>
            <Navbar/>
            <EventList
                list = {props}
            />
        </Container>
    )
}

index.getInitialProps = async () => {
    const res = await _fetch(`${API.URI}/eventos/getInicializationData`)
    const data = res.json()
    return data
}

export default index