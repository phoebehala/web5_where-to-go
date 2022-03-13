import React from 'react'

// api
import GoogleMapReact from 'google-map-react'

// MaterialUI components
import Rating from '@material-ui/lab'

// icons
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

import styled from 'styled-components';
const Container = styled.div`
   height:100vh ;
`
const Map = () => {
  const coordinates = { lat: 0, lng: 0}

  return (
    <Container>
        <GoogleMapReact
          bootstrapURLKeys={{ key:process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
          defaultCenter={coordinates}
          center={coordinates}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          // options={''}
          // onChange={''}
          // onChildClick={''}
        >


        </GoogleMapReact>
    </Container>
  )
}

export default Map