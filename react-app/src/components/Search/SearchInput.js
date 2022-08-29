import React, { useState, useEffect } from 'react';
import Search from '.';

const SearchInput = () => {
   const [query, setQuery] = useState("")
   const [searchResults, setSearchResults] = useState(false)


   useEffect(() => {
      if (!query.length) return setSearchResults(false)
      setSearchResults(true)
   }, [query])

   return (
      <div className='search-container' >
         {<div>
            <input
            className='search-input'
            placeholder='Search for spots'
            value={query}
            onChange={e=> setQuery(e.target.value)}
            onClick={e=> e.stopPropagation}
            />
            {searchResults && <Search query={query} setQuery={setQuery} setSearchResults={setSearchResults}/>}
         </div>}

      </div>
   )
}

export default SearchInput