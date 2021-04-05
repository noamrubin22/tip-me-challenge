import React, {useEffect, useState} from 'react'
import enTranslations from '@shopify/polaris/locales/en.json';
import { Page, Card} from '@shopify/polaris';
import {fetchAirlinesData,  fetchPassengerData} from "./api/api";
import PassengerTable from './PassengerTable';


interface Airline {
    country: string,
    established: string | number,
    head_quarters: string,
    id: number, 
    logo: string,
    name: string,
    slogan: string,
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
    const [airlinesAmount, setAirlinesAmount] = useState<number>(0);
    const [trips, setTrips] = useState<number>(0);
    const [oldestAirline, setOldestAirline] = useState<Airline | undefined>(undefined);
    const [passengersData, setPassengersData] = useState<Passenger | undefined>(undefined);

    useEffect(() => {
        fetchAirlinesData()
            .then(response => {
                const airlineData = response.data;
                setAirlinesAmount(airlineData.length);
                // const cleanAirlineData = cleanData(airlineData);
                // setOldestAirline(getSmallestYear(cleanAirlineData);

                // const cleanData = (airlines:Array<Airline>) : Array<Airline> => {
                //     const result = airlines.map((airline:Airline, _index:number) => {
                //         const establishedYear = airline.established;
    
                //         if (!establishedYear) {
                //             return {...airline, year : undefined }
                //         } else if (typeof establishedYear === "string") {
                //             if (establishedYear.includes("-")){
                //                 const year = Number(establishedYear.substring(0,4));
                //                 return refactorAirlineWithYear(year, airline);
                //             } else if (establishedYear.includes("/")) {
                //                 const year = (Number(establishedYear.substring(establishedYear.length - 4)));
                //                 return refactorAirlineWithYear(year, airline);
                //             } else if (establishedYear.length < 4) {
                //                 return {...airline, year : undefined }
                //             } else if (establishedYear.length === 4) {
                //                 const year = Number(establishedYear);
                //                 return refactorAirlineWithYear(year, airline);
                //             } else if (establishedYear.length > 4) {
                //                 const date = new Date(establishedYear);
                //                 const year = date.getFullYear();
                //                 if (!isNaN(year)) {
                //                     return refactorAirlineWithYear(year, airline)
                //                 } else {
                //                     return {...airline, year : undefined }
                //                 }
                //             }
                //         }
                //     })
                //     console.log("claenData", cleanData);
                //     return []
                // }


                    
                    // .filter((airline:Airline) => {
                    //     if (airline.established) {
                    //         return true
                    //     } else {
                    //         return false
                    //     }
                    // });
                // }
                const validYearsAirlines:Array<Airline> = airlineData.map((airline:Airline, _index:number) => {
                    const establishedYear = airline.established;

                    if (!establishedYear) {
                        return false
                    } else if (typeof establishedYear === "string") {
                        if (establishedYear.includes("-")){
                            const year = Number(establishedYear.substring(0,4));
                            return refactorAirlineWithYear(year, airline);
                        } else if (establishedYear.includes("/")) {
                            const year = (Number(establishedYear.substring(establishedYear.length - 4)));
                            return refactorAirlineWithYear(year, airline);
                        } else if (establishedYear.length < 4) {
                            return false
                        } else if (establishedYear.length === 4) {
                            const year = Number(establishedYear);
                            return refactorAirlineWithYear(year, airline);
                        } else if (establishedYear.length > 4) {
                            const date = new Date(establishedYear);
                            const year = date.getFullYear();
                            if (!isNaN(year)) {
                                return refactorAirlineWithYear(year, airline)
                            } else {
                                return false
                            }
                        }
                    }
                }).filter((el:Airline) => {
                    if (el.established) {
                        return true
                    } else {
                        return false
                    }
                });
                const smallestYear = validYearsAirlines.reduce((acc:Airline|undefined, current:Airline) => {
                    if (acc === undefined) {
                        return current;
                    }
                    if (Number(acc.established) > Number(current.established)) {
                        return current;
                    }
                    return acc
                }, undefined)
                setOldestAirline(smallestYear);
                
            })  
            .catch((error) => {
                console.log(error);
            })
            
            console.log(oldestAirline);
        fetchPassengerData()
            .then(response => {
                const passengerData = response.data.data;
                setPassengersData(passengerData);
                console.log("passengersdata", passengersData);
                setTrips(passengerData.reduce((acc:number, current:Passenger, _index:number) => {
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

        const refactorAirlineWithYear = (year:number, airline:Airline) => {
            const newAirlineObject = {...airline};
            newAirlineObject.established = year;
            return newAirlineObject;
        }

        const getSmallestYear = (airlines:Array<Airline>) => {
            return airlines.reduce((acc:Airline|undefined, current:Airline) => {
                if (acc === undefined) {
                    return current;
                }
                if (Number(acc.established) > Number(current.established)) {
                    return current;
                }
                return acc
            }, undefined)
        }
    return (
        <Page title="Airlines data">
            <Card sectioned>
                <h1>Total amount of airlines: {airlinesAmount}</h1>
            </Card>
            <Card sectioned>
                <h1>Total amount of trips: {trips}</h1>
            </Card>
            <Card sectioned>
                <h1>Overall sales: €{trips * 199}</h1>
            </Card>
            <Card sectioned>
                <h1>The oldest airline ({oldestAirline?.name}) is established in {oldestAirline?.established}  </h1>
            </Card>
            <Card sectioned>
                <PassengerTable data={passengersData}/>
            </Card>
        </Page>   
    )
}

export default App
