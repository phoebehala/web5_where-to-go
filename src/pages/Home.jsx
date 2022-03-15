import React from 'react'
import { useEffect, useState} from 'react';

// components
import Header from '../components/header/Header.jsx';
import Map from '../components/map/Map'
import List from '../components/list/List'

// API
import {getPalcesNearby} from '../api'

import styled from 'styled-components';
const Container = styled.div``

const Home = () => {
  const [places,setPlaces] = useState([])

  const [coordinates, setCoordinates] = useState({}); 
  const [bounds, setBounds] = useState(null);

  const [childClicked, setChildClicked] = useState(null)

  // once a user open the app, get their current location
  useEffect(() => {
    // built-in geolocation API
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
      
    });
  }, []); // fire the function only once
  console.log('coordinates',coordinates); // {lat: 49.2417957, lng: -123.0468475}

  useEffect(()=>{
    if(bounds)  {
      getPalcesNearby(bounds.sw, bounds.ne)
      .then((data)=>{
        console.log(data.slice(0,10));
        setPlaces(data) 
        console.log('Places',places);
      })
    }
  },[coordinates,bounds]) // once coordinates or bounds get changed, fire the function

  return (
    <Container>
        <Header />
        <Map 
          coordinates = {coordinates}
          setBounds= {setBounds}
          setCoordinates= {setCoordinates}
          places={places}
          setChildClicked = {setChildClicked}
        />
        <List places={places}
              childClicked={childClicked}/>
    </Container>
  )
}

export default Home