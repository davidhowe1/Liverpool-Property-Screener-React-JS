import React from 'react'
import { BiSearch } from 'react-icons/bi'

export default function searchbar({ setSearchQuery }) {
  return (
    <input type="search" placeholder='Town, Address, Postcode...'
      onChange={(event) => {
      setSearchQuery(event.target.value)
    }}
    />
  )
}
