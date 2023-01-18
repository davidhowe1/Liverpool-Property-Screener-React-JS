import React from 'react'

export default function searchbar({ setSearchQuery }) {
  return (
    <input type="search" placeholder='Town, Address, Postcode...'
      onChange={(event) => {
      setSearchQuery(event.target.value)
    }}
    />
  )
}
