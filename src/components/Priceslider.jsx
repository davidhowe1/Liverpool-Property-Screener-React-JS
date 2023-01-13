import React from 'react';
import { Slider } from '@mui/material';

export default function priceslider( {priceSelector, value} ) {
  return (
    <>
        <h3>Price Range</h3>

        <Slider
        onChange={priceSelector}
        size="medium"
        defaultValue={500000}
        min={10000}
        max={1000000}
        aria-label="Large"
        valueLabelDisplay="auto"
        sx={{
            color: '#5c5ce0',
        }}
        />

        <div className='price-markers'>
            <span>£10k</span>
            <span>£500k</span>
            <span>£1m</span>
        </div>

        <div className='value'>
            <span>Up to: £{value.toLocaleString()}</span>
        </div>
    </>
)
}
