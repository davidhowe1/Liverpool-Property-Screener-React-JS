import React from 'react';
import { Tooltip } from '@mui/material';
import Header from './Header';
import Priceslider from './Priceslider';
import { CheckCircleFill, InfoCircle } from 'react-bootstrap-icons';
import { HousesFill, ClockFill, Stars, Buildings, HouseFill, GraphDownArrow, BookmarkCheckFill, SunFill, MoonFill } from 'react-bootstrap-icons';

export default function sidepanel ({ setSearchQuery, toggleFilter, setAllProperties, setRecent, 
  setNewHomes, setApartments, setTwoBed, setThreeBed, setFourBedPlus, value, priceSelector, newHomes,
  recent, apartments, twoBed, threeBed, fourBedsPlus, toggleBookmarksBar, 
  bookmarkTotal, calculateBelowMarketValue, toggleTheme, theme, mobileMenu}) {

  return (
    <div className={mobileMenu ? 'side-panel active' : 'side-panel'}>
      <Header
      setSearchQuery={setSearchQuery} 
      />
      
      <div className='filtering-options'>
        <h3>Quick Filters</h3>
        <ul>
            <li onClick={() => setAllProperties()}>
              <p><HousesFill />All Properties</p>
              </li>

            <li onClick={() => toggleFilter(recent, setRecent)}>
              <p><ClockFill />Recently Added</p>
            <div>{recent ? <CheckCircleFill /> : ''}</div></li>

            <li onClick={() => toggleFilter(newHomes, setNewHomes)}>
              <p><Stars />New Homes</p>
            <div>{newHomes ? <CheckCircleFill /> : ''}</div></li>

            <li onClick={() => toggleFilter(apartments, setApartments)}>
              <p><Buildings />Apartments</p>
            <div>{apartments ? <CheckCircleFill /> : ''}</div></li>

            <li onClick={() => toggleFilter(twoBed, setTwoBed)}>
              <p><HouseFill />2 Bedrooms</p>
            <div>{twoBed ? <CheckCircleFill /> : ''}</div></li>

            <li onClick={() => toggleFilter(threeBed, setThreeBed)}>
              <p><HouseFill />3 Bedrooms</p>
            <div>{threeBed ? <CheckCircleFill /> : ''}</div></li>

            <li onClick={() => toggleFilter(fourBedsPlus, setFourBedPlus)}>
              <p><HouseFill />4+ Bedrooms</p>
            <div>{fourBedsPlus ? <CheckCircleFill /> : ''}</div></li>
        </ul>

        <div className='price-slider'>
        <Priceslider 
        value={value}
        priceSelector={priceSelector}
        />
        </div>

        <ul>
          <li onClick={() => calculateBelowMarketValue()}>
            <p><GraphDownArrow />Below Market Value</p>
              <Tooltip title={<p style={{ fontSize: '1rem' }}>Click this button to show
               the properties that are below the average price of all the properties on show.</p>}
               placement='right'>
                <InfoCircle />
              </Tooltip>
          </li>

          <li onClick={() => toggleBookmarksBar()}>
            <p><BookmarkCheckFill />Bookmarks</p>
            <p className='total'>{bookmarkTotal}</p>
          </li>

          <li onClick={() => toggleTheme()}>
            <p>{theme === 'light' ? <MoonFill /> : <SunFill />}Toggle Theme</p>
          </li>
        </ul>
      </div>
    </div>
  )
}