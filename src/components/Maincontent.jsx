import React from 'react';
import { BiBed, BiBath, BiHome } from "react-icons/bi";
import { HeartFill } from 'react-bootstrap-icons';

export default function maincontent({ properties, display, valueRef, 
    cardView, sortByPrice, sortByBedrooms, sortByBathrooms, createBookmark, 
    showDetailedCardView, searchQuery }) {

  return (
    properties.sort((a, b) => {

        if (sortByPrice === true) {
            return a.price - b.price;
        } else if (sortByPrice === false) {
            return b.price - a.price;
        }

        if (sortByBedrooms === true) {
            return a.bedrooms - b.bedrooms;
        } else if (sortByBedrooms === false) {
            return b.bedrooms - a.bedrooms;
        }

        if (sortByBathrooms === true) {
            return a.bathrooms - b.bathrooms;
        } else if (sortByBathrooms === false) {
            return b.bathrooms - a.bathrooms;
        }

        if (sortByPrice === null && sortByBedrooms === null && sortByBathrooms === null) {
            return a.index - b.index;
        }

    }).filter((value) => {
        if (searchQuery == '') {
            return value
        } else if (value.address.toLowerCase().includes(searchQuery.toLowerCase())) {
            return value
        }
    }).map((house) => (
        <div key={house.index} id={house.index} className={cardView ? 'property-card' : 'property-card list'} style={{display: {display}}}>
            <div className='property-image'>
                <img src={house.image} alt="" />
                <div onClick={createBookmark} className='bookmark-icon' title='Bookmark Property'>
                    <HeartFill />
                </div>
            </div>

            <div className='property-text'>
                <h3 title={house.address}>{house.address}</h3>

                <div className='property-details'>
                    <span><BiHome />{house.type}</span>
                    <span><BiBed />{house.bedrooms}</span>
                    <span><BiBath />{house.bathrooms}</span>
                </div>

                <div className='property-status'>
                    <span>{house.newHome}</span>
                    <span>{house.recentlyAdded}</span>
                </div>

                <div className='property-description'>
                    <p>{house.description}</p>
                </div>

                <div className='property-button-container'>
                    <h3 ref={valueRef}>£{house.price.toLocaleString()}</h3>
                    <button onClick={showDetailedCardView} className='view-property'>View Property</button>
                </div>
            </div>
        </div>
    )) 
  )
}
