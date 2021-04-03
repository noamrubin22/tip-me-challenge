import axios from 'axios';

type DataResponse = {
    data : any[]
}

const airlinesApi = "https://api.instantwebtools.net/v1/airlines";
const passengerApi = "https://api.instantwebtools.net/v1/passenger";

const fetchAirlinesData = () => {
    return axios.get(airlinesApi)
}

const fetchPassengerData = () => {
    return axios.get(passengerApi)
}

export { fetchAirlinesData, fetchPassengerData }
