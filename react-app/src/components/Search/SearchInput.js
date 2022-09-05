import React, { useState, useEffect } from 'react';
import Search from '.';

const SearchInput = () => {
   const [query, setQuery] = useState("")
   const [searchResults, setSearchResults] = useState(false)

   const handleBlur = () => {
      setSearchResults(false)
      setQuery('')
   }
   const onSearchChange = (e) => {
      setQuery(e.target.value)
   }

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
            onChange={onSearchChange}
            onClick={e=> e.stopPropagation}
            onBlur={()=> setTimeout(handleBlur,1000)}
            />
            {searchResults && <Search query={query} setQuery={setQuery} setSearchResults={setSearchResults}/>}
         </div>}

      </div>
   )
}

export default SearchInput