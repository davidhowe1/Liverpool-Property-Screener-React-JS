import React from 'react'
import { BiBed, BiBath, BiHome } from "react-icons/bi";
import { TrashFill } from 'react-bootstrap-icons';

export default function BookmarksBar ({ bookmarks, removeBookmark, showDetailedCardView }) {
  return (
    bookmarks.map(bookmark => (
        <div key={bookmark.index} id={bookmark.index} className='bookmark-card'>
            <div className='bookmark-image'>
                <img src={bookmark.image} alt="" />
                <div onClick={() => removeBookmark(bookmark.index)} className='remove-bookmark-icon' title='Remove Bookmark'>
                    <TrashFill />
                </div>
            </div>

            <div className='property-text'>
                <h3 title={bookmark.address}>{bookmark.address}</h3>

                <div className='property-details'>
                    <span><BiHome />{bookmark.type}</span>
                    <span><BiBed />{bookmark.bedrooms}</span>
                    <span><BiBath />{bookmark.bathrooms}</span>
                </div>

                <div className='property-status'>
                    <span>{bookmark.newHome}</span>
                    <span>{bookmark.recentlyAdded}</span>
                </div>

                <div className='property-description'>
                    <p>{bookmark.description}</p>
                </div>

                <div className='property-button-container'>
                    <h3>£{bookmark.price.toLocaleString()}</h3>
                    <button onClick={showDetailedCardView} className='view-property'>View Property</button>
                </div>
            </div>
        </div>
    ))
  )
}
