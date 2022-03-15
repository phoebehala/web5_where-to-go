import React, { useState } from 'react'

// icons
import {MdLocationPin} from 'react-icons/md'
import {RiMapPin3Fill} from 'react-icons/ri'

const MapItem = ( {place} ) => {
    const [isPinHovered, setIsPinHovered] = useState(false)

  return (
    <div>
         <RiMapPin3Fill style={{color:"red", fontSize:"2rem"}}
                        onMouseEnter={() => setIsPinHovered(true)}
                        onMouseLeave={() => setIsPinHovered(false)}
         />

        { isPinHovered && (
         <div>
            {place.properties.name}
        </div>
        )}

    </div>
  )
}

export default MapItem