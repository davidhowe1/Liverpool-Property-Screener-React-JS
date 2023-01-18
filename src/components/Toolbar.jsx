import React from 'react';
import Searchbar from './Searchbar';
import { BiPound, BiBath, BiBed, BiSortAlt2, BiGridAlt, BiListUl, BiMenu } from 'react-icons/bi';
import { ArrowDown, ArrowUp, Sliders, Plus } from 'react-bootstrap-icons';

function Toolbar ({ handleCardView, cardView, toggleMobileMenu, properties,  
  mobileMenu, toggleSortingOptions, sortingOptions, setSearchQuery, setProperties, 
  setSortByPrice, setSortByBedrooms, setSortByBathrooms, sortByPrice, sortByBedrooms, 
  sortByBathrooms}) {

    const propertyListingsCopy = [...properties];

    const sortPriceAscending = () => {
      setSortByPrice(true)
      setSortByBedrooms(null)
      setSortByBathrooms(null)
      propertyListingsCopy.sort((a, b) => a.price - b.price)
      setProperties([...propertyListingsCopy])
    }

    const sortPriceDescending = () => {
      setSortByPrice(false)
      setSortByBedrooms(null)
      setSortByBathrooms(null)
      propertyListingsCopy.sort((a, b) => b.price - a.price)
      setProperties([...propertyListingsCopy])
    }

    const sortBedroomsAscending = () => {
      setSortByPrice(null)
      setSortByBedrooms(true)
      setSortByBathrooms(null)
      propertyListingsCopy.sort((a, b) => a.bedrooms - b.bedrooms)
      setProperties([...propertyListingsCopy])
    }

    const sortBedroomsDescending = () => {
      setSortByPrice(null)
      setSortByBedrooms(false)
      setSortByBathrooms(null)
      propertyListingsCopy.sort((a, b) => b.bedrooms - a.bedrooms)
      setProperties([...propertyListingsCopy])
    }

    const sortBathroomsAscending = () => {
      setSortByPrice(null)
      setSortByBedrooms(null)
      setSortByBathrooms(true)
      propertyListingsCopy.sort((a, b) => a.bathrooms - b.bathrooms)
      setProperties([...propertyListingsCopy])
    }

    const sortBathroomsDescending = () => {
      setSortByPrice(null)
      setSortByBedrooms(null)
      setSortByBathrooms(false)
      propertyListingsCopy.sort((a, b) => b.bathrooms - a.bathrooms)
      setProperties([...propertyListingsCopy])
    }

    const resetSortingOptions = () => {
      setSortByPrice(null)
      setSortByBedrooms(null)
      setSortByBathrooms(null)
      propertyListingsCopy.sort((a, b) => a.index - b.index)
      setProperties([...propertyListingsCopy])
    }

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
            <button onClick={sortPriceAscending} className={sortByPrice === true ? 'sort active' : 'sort'}><BiPound /><ArrowUp /></button>
            <button onClick={sortPriceDescending} className={sortByPrice === false ? 'sort active' : 'sort'}><ArrowDown /></button>
          </div>

          <div className='sort-by-bedrooms'>
            <button onClick={sortBedroomsAscending} className={sortByBedrooms === true ? 'sort active' : 'sort'}><BiBed /><ArrowUp /></button>
            <button onClick={sortBedroomsDescending} className={sortByBedrooms === false ? 'sort active' : 'sort'}><ArrowDown /></button>
          </div>

          <div className='sort-by-bathrooms'>
            <button onClick={sortBathroomsAscending} className={sortByBathrooms === true ? 'sort active' : 'sort'}><BiBath /><ArrowUp /></button>
            <button onClick={sortBathroomsDescending} className={sortByBathrooms === false ? 'sort active' : 'sort'}><ArrowDown /></button>
          </div>

          <div className='reset-sorting-options'>
            <button onClick={resetSortingOptions} className='grid'>Reset Options</button>
          </div>
        </div>

        {/* <div onClick={handleNewListingForm} className='create-new-listing-button'>
          New Listing <Plus />
        </div> */}

        <div className={sortingOptions ? 'toggle-sorting-options active' : 'toggle-sorting-options'} 
          onClick={toggleSortingOptions}>
          <p>Sort</p> <Sliders />
        </div>
    </div>

  )
}

export default Toolbar