import React, { useState } from 'react'

// MaterialUI components
import Rating from '@material-ui/lab'

// icons
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';


// api
import GoogleMapReact from 'google-map-react'

// components
import MapItem from './MapItem';

import styled from 'styled-components';

const Container = styled.div`
   height:100vh ;
`

const Map = ( {coordinates,setBounds,setCoordinates, places, setChildClicked} ) => {
  // lifting the state up

  return (
    <Container>
        <GoogleMapReact
          bootstrapURLKeys={{ key:process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
          // defaultCenter={coordinates}
          center={coordinates}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          // options={''}
          onChange={(e)=>{
            console.log(e);
            setCoordinates({lat: e.center.lat, lng: e.center.lng})
            setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
          }}
          onChildClick={(child)=>{setChildClicked(child)}}
        >
          {places && places.map((place,i)=>(    
              <div
                key={i}
                lat={place.geometry.coordinates[1]}
                lng={place.geometry.coordinates[0]}
              >
                <MapItem place={place}/>       
              </div>
          ))
          }


        </GoogleMapReact>
    </Container>
  )
}

export default Map