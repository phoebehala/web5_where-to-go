import React, { useState } from 'react'

// icons
import {MdLocationPin} from 'react-icons/md'
import {RiMapPin3Fill} from 'react-icons/ri'

// materialUI component
import Rating from '@material-ui/lab/Rating';

import styled from 'styled-components';

const BriefWrapper = styled.div`
    z-index:999;
    min-width:150px;
    background-color: white;
    padding:5px 10px ;

  
`

const MapItem = ( {place} ) => {
    const [isPinHovered, setIsPinHovered] = useState(false)

  return (
    <div>
         <RiMapPin3Fill style={{color:"red", fontSize:"2rem"}}
                        onMouseEnter={() => setIsPinHovered(true)}
                        onMouseLeave={() => setIsPinHovered(false)}
         />
         {/* hihihi */}

        { isPinHovered && (
          <BriefWrapper>
              <p>{place.properties.name}</p>
              <div>
                <Rating name="read-only" value={place.properties.rate} readOnly />
              </div>
          </BriefWrapper>
        )}

    </div>
  )
}

export default MapItem