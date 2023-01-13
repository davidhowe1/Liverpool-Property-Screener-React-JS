import React from 'react';
import Searchbar from './Searchbar';
import { BiPound, BiBath, BiBed, BiSortAlt2, BiGridAlt, BiListUl, BiMenu } from 'react-icons/bi';
import { ArrowDown, ArrowUp, Sliders } from 'react-bootstrap-icons';

export default function toolbar({ handleCardView, sortPriceAscending, sortPriceDescending, 
  sortBedroomsAscending, sortBedroomsDescending, sortBathroomsAscending, sortBathroomsDescending, 
  resetSortingOptions, cardView, toggleMobileMenu, mobileMenu, toggleSortingOptions, 
  sortingOptions, setSearchQuery}) {

  return (
    <div className='toolbar'>

        <div className={mobileMenu ? 'toggle-mobile-menu active' : 'toggle-mobile-menu'} 
          onClick={toggleMobileMenu} >
          <BiMenu />
        </div>

        <div className='mobile-search-bar'>
          <Searchbar
            setSearchQuery={setSearchQuery}
          />
        </div>

        <div className={sortingOptions ? 'sorting-options active' : 'sorting-options'}>
          <p>Sort <BiSortAlt2 /></p>

          <button onClick={handleCardView} className='grid'>
            {cardView ? <><BiListUl /> List View</> : <><BiGridAlt /> Grid View</>}
          </button>

          <div className='sort-by-price'>
            <button onClick={sortPriceAscending} className='sort'><BiPound /><ArrowUp /></button>
            <button onClick={sortPriceDescending} className='sort'><ArrowDown /></button>
          </div>

          <div className='sort-by-bedrooms'>
            <button onClick={sortBedroomsAscending} className='sort'><BiBed /><ArrowUp /></button>
            <button onClick={sortBedroomsDescending} className='sort'><ArrowDown /></button>
          </div>

          <div className='sort-by-bathrooms'>
            <button onClick={sortBathroomsAscending} className='sort'><BiBath /><ArrowUp /></button>
            <button onClick={sortBathroomsDescending} className='sort'><ArrowDown /></button>
          </div>

          <div className='reset-sorting-options'>
            <button onClick={resetSortingOptions} className='grid'>Reset Options</button>
          </div>
        </div>

        <div className={sortingOptions ? 'toggle-sorting-options active' : 'toggle-sorting-options'} 
          onClick={toggleSortingOptions}>
          <p>Sort</p> <Sliders />
        </div>
    </div>

  )
}
