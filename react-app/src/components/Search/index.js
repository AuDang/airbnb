import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import React, { useEffect } from "react";


import { useHistory, useParams } from "react-router-dom";


const Search = ({query, setQuery, setSearchResults}) => {
    const sessionUser = useSelector(state => state.session.user)
    const spots = useSelector(state=>state.spots)
    console.log('SearchSpooot', spots)
    // const spotValue = Object.values(spots).filter(spots => spots.name)
    // console.log('spotValue', spotValue)

  const spotResults = Object.values(spots)?.filter(
    spots => spots?.name?.toLowerCase().includes(query?.toLowerCase()))
  
  console.log('Spotresults', spotResults)

  const formatResult = result => {
  const index = result.toUpperCase().indexOf(query?.toUpperCase());
  const len = query.length;

  const subStringOne = result.slice(0, index);
  const match = result.slice(index, index + len);
  const subStringTwo = result.slice(index+len);

  return (
    <span>{subStringOne}<span className='match'>{match}</span>{subStringTwo}</span>
  )
}
 return (
    <div className='search-results'
    onClick={e=>e.stopPropagation()}>
      <ul>
        {spotResults.length ? spotResults.map(spot=>
        <li key={`search-card-${spot.id}`}>
          <div className='search-results-item'>
            <NavLink className='search-result-text' to={`/spots/${spot.id}`} onClick={e => {
              setSearchResults(false)
              setQuery('')
            }}>
              {formatResult(spot?.name)}
            </NavLink>
          </div>
        </li>)
      :'No results found...'}</ul>

    </div>
 ) 
}

export default Search