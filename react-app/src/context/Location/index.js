import { createContext } from 'react'
import { useContext } from 'react'
import { Country, State, City } from 'country-state-city';

export const LocationContext = createContext();

const LocationProvider = (props) => {

    let countries = [Country.getCountryByCode('US')]
    let states = State.getStatesOfCountry('US')

    let cities = City.getCitiesOfCountry('US')
    const set = new Set()
    const filter = []
    cities.forEach(({ name }) => {
        if (!set.has(name)) {
            set.add(name)
            filter.push(name)
        }
    })

    return (
        <LocationContext.Provider value={{ countries, states,}}>
            {props.children}
        </LocationContext.Provider>
    )
}
export const useLocations = () => {
    return useContext(LocationContext)
}

export default LocationProvider