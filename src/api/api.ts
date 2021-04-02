import {useState, useEffect} from 'react'
import axios from 'axios';

type DataResponse = {
    data : any[]
}

const airlinesApi = "https://api.instantwebtools.net/v1/airlines";
const tripsApi = "https://api.instantwebtools.net/v1/passenger?page=0&size=10";

const fetchAirlinesData = () => {
    return axios.get(airlinesApi)
}

const fetchTripsData = () => {
    return axios.get(tripsApi)
}

export { fetchAirlinesData, fetchTripsData }
