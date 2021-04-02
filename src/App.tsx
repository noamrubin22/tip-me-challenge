import React, {useEffect, useState} from 'react'
import enTranslations from '@shopify/polaris/locales/en.json';
import { Page, Card, Button} from '@shopify/polaris';
import {fetchAirlinesData, fetchTripsData} from "./api/api";
import axios from 'axios';



const App = () => {
    const [airlines, setAirlines] = useState<number>(0);
    const [trips, setTrips] = useState<number>(0);
    // const [oldestAirline, setOldestAirline] = useState<{}>({});

    useEffect(() => {
        fetchAirlinesData()
            .then(response => {
                const airlinesData = response.data;
                setAirlines(airlinesData.length)
            })  
            .catch((error: any) => {
                console.log(error);
            })

        fetchTripsData()
            .then(response => {
                const passengerData = response.data.data;
                setTrips(passengerData.reduce((acc:number, current:any) => acc + current.trips, 0))
            })
            .catch((error: any) => {
                console.log(error)
            })
    },[])

    return (
        <Page title="Airlines data">
            <Card sectioned>
                <h1>Total amount of airlines: {airlines}</h1>
            </Card>
            <Card sectioned>
                <h1>Total amount of trips: {trips}</h1>
            </Card>
            <Card sectioned>
                <h1>Overall sales: €{trips * 199}</h1>
            </Card>
            <Card sectioned>
                <h1>Establishing year of the oldest airline: </h1>
            </Card>
        </Page>   
    )
}

export default App
