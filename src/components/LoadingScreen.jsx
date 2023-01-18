import React from 'react'
import { useEffect, useState } from 'react';
import { BiHomeAlt } from 'react-icons/bi';

function LoadingScreen() {

    const [loadingScreen, setLoadingScreen] = useState(true)

    useEffect(() => {
      setTimeout(() => setLoadingScreen(false), 3000)
    }, [])

  return (
    <div className={loadingScreen ? 'loading-screen' : 'loading-screen inactive'}>
        <div>
            <BiHomeAlt />
        </div>
        <h3> </h3>
    </div>
  )
}

export default LoadingScreen