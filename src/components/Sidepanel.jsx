import React from 'react';
import { Tooltip } from '@mui/material';
import Header from './Header';
import Priceslider from './Priceslider';
import { CheckCircleFill, InfoCircle } from 'react-bootstrap-icons';
import { HousesFill, ClockFill, Stars, Buildings, HouseFill, GraphDownArrow, BookmarkCheckFill, SunFill, MoonFill } from 'react-bootstrap-icons';

export default function sidepanel ({ setSearchQuery, allProperties, 
  recentlyAdded, apartments, twoBed, threeBed, 
  fourPlusBed, value, priceSelector, filterByNew, newHome,
  recent, apartment, twoBeds, threeBeds, fourBedsPlus, toggleBookmarksBar, 
  bookmarkTotal, calculateBelowMarketValue, toggleTheme, theme, mobileMenu}) {

  return (
    <div className={mobileMenu ? 'side-panel active' : 'side-panel'}>
      <Header
      setSearchQuery={setSearchQuery} 
      />
      
      <div className='filtering-options'>
        <h3>Quick Filters</h3>
        <ul>
            <li onClick={allProperties}>
              <p><HousesFill />All Properties</p>
              </li>

            <li onClick={recentlyAdded}>
              <p><ClockFill />Recently Added</p>
            <div>{recent ? <CheckCircleFill /> : ''}</div></li>

            <li onClick={filterByNew}>
              <p><Stars />New Homes</p>
            <div>{newHome ? <CheckCircleFill /> : ''}</div></li>

            <li onClick={apartments}>
              <p><Buildings />Apartments</p>
            <div>{apartment ? <CheckCircleFill /> : ''}</div></li>

            <li onClick={twoBed}>
              <p><HouseFill />2 Bedrooms</p>
            <div>{twoBeds ? <CheckCircleFill /> : ''}</div></li>

            <li onClick={threeBed}>
              <p><HouseFill />3 Bedrooms</p>
            <div>{threeBeds ? <CheckCircleFill /> : ''}</div></li>

            <li onClick={fourPlusBed}>
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
          <li onClick={calculateBelowMarketValue}>
            <p><GraphDownArrow />Below Market Value</p>
              <Tooltip title={<p style={{ fontSize: '1rem' }}>Click this button to show
               the properties that are below the average price of all the properties on show.</p>}
               placement='right'>
                <InfoCircle />
              </Tooltip>
          </li>

          <li onClick={toggleBookmarksBar}>
            <p><BookmarkCheckFill />Bookmarks</p>
            <p className='total'>{bookmarkTotal}</p>
          </li>

          <li onClick={toggleTheme}>
            <p>{theme === 'light' ? <MoonFill /> : <SunFill />}Toggle Theme</p>
          </li>
        </ul>
      </div>
    </div>
  )
}