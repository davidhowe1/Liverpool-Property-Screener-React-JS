import React from 'react'
import { BiBed, BiBath, BiHome } from "react-icons/bi";

export default function DetailedView ({ detailedViewIsHidden, renderDetailedView, detailedView }) {
  return (

    detailedView.map(house => (
        <div key={house.index} className={renderDetailedView ? 'detailed-view' : 'detailed-view hidden'}>
            <div className='detailed-view-image'>
                <img src={house.image} alt="" />
            </div>

            <div className='detailed-view-text-container'>
                <div>
                    <h1>{house.address}</h1>

                    <div className='detailed-view-property-details'>
                        <h1>£{house.price}</h1>

                        <div className='property-details'>
                            <span><BiHome />{house.type}</span>
                            <span><BiBed />{house.bedrooms}</span>
                            <span><BiBath />{house.bathrooms}</span>
                        </div>

                        <div className='detailed-view-property-status'>
                            <span>{house.newHome}</span>
                            <span>{house.recentlyAdded}</span>
                        </div>
                    </div>

                    <div className='detailed-view-description'>
                        <h3>Description</h3>
                        <p>{house.description}</p>
                    </div>

                </div>

                <div className='button-container'>
                    <div>
                        <button onClick={detailedViewIsHidden} className='close-detailed-view'>Close</button>

                        <a href={house.propertyLink} target='_blank' rel="noreferrer">
                            <button className='view-property'>Visit Property Link</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    ))
  )
}
