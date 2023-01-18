import React from 'react'
import { CheckSquareFill } from 'react-bootstrap-icons'

function NewListingAlert({ success }) {
  return (
    <div>
        <div className={success ? 'new-listing-alert' : 'new-listing-alert hidden'}>
            <div><CheckSquareFill /></div>
            You have created a new listing!
        </div>
    </div>
  )
}

export default NewListingAlert