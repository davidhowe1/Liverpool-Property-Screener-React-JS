import React from 'react';
import { BiHomeAlt } from "react-icons/bi";
import Searchbar from './Searchbar';


export default function header({ setSearchQuery }) {
  return (
    <header>
        <BiHomeAlt className='logo' />
        <div className='search-bar'>
          <Searchbar 
            setSearchQuery={setSearchQuery}
          />
        </div>
    </header>
  )
}
