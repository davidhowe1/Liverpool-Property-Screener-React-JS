import React from 'react'
import { useState, useEffect } from 'react';
import { BiXCircle } from 'react-icons/bi'
import { CardImage } from 'react-bootstrap-icons'
import NewListingAlert from './NewListingAlert';

function NewListingForm({ newListingForm, closeNewListingForm, 
    setProperties, properties}) {

const [index, setIndex] = useState(properties.length)
const [image, setImage] = useState('');
const [address, setAddress] = useState('');
const [description, setDescription] = useState('');
const [price, setPrice] = useState('');
const [bedrooms, setBedrooms] = useState(0);
const [bathrooms, setBathrooms] = useState(0);
const [propertyLink, setPropertyLink] = useState('');
const [type, setType] = useState('');
const [newHome, setNewHome] = useState('');
const [success, setSuccess] = useState(false)
const [formValid, setFormValid] = useState(true)
const [formSubmitted, setFormSubmitted] = useState(false);

const handleSuccessMsg = () => {
    closeNewListingForm()
    setSuccess(true)
    setTimeout(() => {
        setSuccess(false)
      }, 5000)
}

const handleInputChange = (e) => {
    if (image.length > 0 && address.length > 0 && description.length > 0 && 
        price.length > 0 && type.length > 0 && propertyLink.length > 0 &&
        bedrooms >= 0 && bathrooms >= 0) {
            setFormValid(true)
        } else {
            setFormValid(false)
        }
  }

const handleSubmit = (e) => {
    e.preventDefault();
    if (formValid) {
        const newListing = {
        index: index,
        image: image,
        address: address,
        description: description,
        price: price,
        bedrooms: parseInt(bedrooms),
        bathrooms: parseInt(bathrooms),
        propertyLink: propertyLink,
        type: type,
        newHome: newHome,
        recentlyAdded: 'Your Listing'
        }
        closeNewListingForm()
        handleSuccessMsg()
        setProperties(prevArray => [...prevArray, newListing])
        setIndex(properties.length)
        setFormSubmitted(true)
    }
}

useEffect(() => {
    if (formSubmitted) {
        localStorage.setItem('updated-properties', JSON.stringify(properties))
    }
}, [formSubmitted])

  return (
    <>
        <NewListingAlert
            success={success}
        />

        <div className={newListingForm ? 'new-listing active' : 'new-listing'}>
            <div className='new-listing-close'>
                <div className='close-button'>
                    <h4>Create New Listing</h4>
                    <div className='close' onClick={closeNewListingForm}>
                        <BiXCircle />
                    </div>
                </div>

                <div className={formValid === true ? 'validate-error-msg hidden' : 'validate-error-msg'}>
                    Please complete the form before submitting
                </div>
            </div>

            <form className='form-wrapper' onSubmit={() => handleSubmit()}>
                <div className='image-url-input'>
                    <div className='image-placeholder'>
                        <CardImage />
                        <div>
                            <label htmlFor="image-url">Add Image URL</label>
                            <input name='image' className='new-listing-input'
                                autoComplete='off'
                                value={image}
                                onChange={(e) => {setImage(e.target.value); handleInputChange(e)}}
                                type="text" />
                        </div>
                    </div>
                </div>

                <div className='data-field'>
                    <label htmlFor="address">Property Address</label>
                    <input name='address' className='new-listing-input'
                        autoComplete='off'
                        value={address}
                        onChange={(e) => {setAddress(e.target.value); handleInputChange(e)}} 
                        placeholder='Postcode, Street, Area, Town etc'
                        type="text"
                    />
                </div>

                <div className='data-field'>
                    <label htmlFor="description">Description</label>
                    <textarea name='description' className='new-listing-input description'
                        autoComplete='off'
                        value={description}
                        onChange={(e) => {setDescription(e.target.value); handleInputChange(e)}}
                        type="text" 
                        placeholder='Description and Details of the property etc'
                    />
                </div>
                
                <div className='data-field'>
                    <label htmlFor="price">Price £</label>
                    <input name='price' className='new-listing-input'
                        autoComplete='off'
                        value={price}
                        onChange={(e) => {setPrice(e.target.value); handleInputChange(e)}} 
                        type="text" />
                </div>

                <p>Type</p>

                <div className='new-listing-house-options'>
                    <p className={type === 'Terraced' ? 'active' : ''} 
                        onClick={() => setType('Terraced')}>Terraced</p>

                    <p className={type === 'Semi-Detached' ? 'active' : ''} 
                        onClick={() => setType('Semi-Detached')}>Semi-Detached</p>

                    <p className={type === 'Apartment' ? 'active' : ''} 
                        onClick={() => setType('Apartment')}>Apartment</p>

                    <p className={type === 'Bungalow' ? 'active' : ''} 
                        onClick={() => setType('Bungalow')}>Bungalow</p>

                    <p className={type === 'Detached' ? 'active' : ''} 
                        onClick={() => setType('Detached')}>Detached</p>

                    <p className={type === 'End of Terrace' ? 'active' : ''} 
                        onClick={() => setType('End of Terrace')}>End of Terrace</p>

                    <p className={type === 'Retirement Property' ? 'active' : ''} 
                        onClick={() => setType('Retirement Property')}>Retirement Property</p>
                </div>

                <div className='data-field-row'>
                    <div>
                        <p>Bedrooms:</p>
                        <input name='bedrooms' className='number'
                            value={bedrooms}
                            onChange={(e) => {setBedrooms(e.target.value); handleInputChange(e)}} 
                            type="number" />
                    </div>

                    <div>
                        <p>Bathrooms:</p>
                        <input name='bathrooms' className='number'
                            value={bathrooms}
                            onChange={(e) => {setBathrooms(e.target.value); handleInputChange(e)}} 
                            type="number" />
                    </div>
                </div>

                <p>New Home</p>

                <div className='new-listing-house-options'>
                    <p className={newHome === '' ? 'active' : ''} onClick={() => setNewHome('')}>No</p>
                    <p className={newHome === 'New Home' ? 'active' : ''} onClick={() => setNewHome('New Home')}>Yes</p>
                </div>

                <div>
                    <label htmlFor="property-link">Property Link</label>
                    <input name='property-link' className='new-listing-input'
                        autoComplete='off'
                        value={propertyLink}
                        onChange={(e) => {setPropertyLink(e.target.value); handleInputChange(e)}} 
                        type="text" />
                </div>

                <button className='create-listing' onClick={handleSubmit}>
                    Create Listing
                </button>
            </form>
        </div>
    </>
  )
}

export default NewListingForm