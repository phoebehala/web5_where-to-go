import React, { useState } from 'react'


// api
import GoogleMapReact from 'google-map-react'

// components
import MapItem from './MapItem';

import styled from 'styled-components';

// redux
import {setCoordinates, setBounds} from '../../redux/locationSlice'
import { useDispatch, useSelector } from 'react-redux';

const Container = styled.div`
   height:100vh ;
`

const Map = ( {setChildClicked} ) => {

  const dispatch = useDispatch()
  const coordinates = useSelector(state=>state.location.coordinates)
  const places = useSelector(state=>state.place.places)


  const handleClickChild = (child)=>{
    setChildClicked(child)

  }

  return (
    <Container>
        <GoogleMapReact
          bootstrapURLKeys={{ key:process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
          defaultCenter={coordinates}
          center={coordinates}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          // options={''}
          onChange={(e)=>{
            console.log(e);
             dispatch(
                setCoordinates({lat: e.center.lat, lng: e.center.lng})
              )
              dispatch(
                setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw })
              )
          }}
          onChildClick={(child)=>{handleClickChild(child)}}
        >
          {places && places.map((place,i)=>(    
              <MapItem
                key={i}
                lat={place.geometry.coordinates[1]}
                lng={place.geometry.coordinates[0]}
                place={place} 
              />
          ))
          }


        </GoogleMapReact>
    </Container>
  )
}

export default Map