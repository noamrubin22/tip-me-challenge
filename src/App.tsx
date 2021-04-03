import React, {useEffect, useState} from 'react'
import enTranslations from '@shopify/polaris/locales/en.json';
import { Page, Card} from '@shopify/polaris';
import {fetchAirlinesData,  fetchPassengerData} from "./api/api";


interface Airline {
    country: string,
    established: string,
    head_quarters: string,
    id: number, 
    logo: string,
    name: string,
    sloagen: string,
    website: string
}

interface Passenger {
    airline: Airline,
    name: string,
    trips: number,
    __v: number,
    _id: number
}

const App = () => {
    const [airlines, setAirlines] = useState<number>(0);
    const [trips, setTrips] = useState<number>(0);
    const [oldestAirline, setOldestAirline] = useState<Airline>();

    useEffect(() => {
        fetchAirlinesData()
            .then(response => {
                const airlineData = response.data;
                setAirlines(airlineData.length);
                
                const establishedYears:Array<number> = [];
                const unknownYearList: Array<Airline> = []; 
                const leftOvers: Array<Airline> = [];

                setOldestAirline(airlineData.reduce((acc:string, current:Airline, index:number) =>{
                    if (typeof current.established === 'string') {
                        const year = Number(current.established);
                        if (isNaN(year)) {
                            unknownYearList.push(current)
                        } else {
                            establishedYears.push(year)
                        }
                    } else {
                        leftOvers.push(current)
                    }
                    console.log("not a number list", unknownYearList);
                    console.log("leftovers:", leftOvers);
                }))
            })  
            .catch((error) => {
                console.log(error);
            })

        fetchPassengerData()
            .then(response => {
                const passengerData = response.data.data;

                setTrips(passengerData.reduce((acc:number, current:Passenger, index:number) => {
                    if((isNaN(current.trips))) {
                        return acc + 0
                    } else {
                        return acc + current.trips
                    }
                },0))
            })
            .catch((error) => {
                console.log(error);
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
