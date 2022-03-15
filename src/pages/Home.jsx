import React from 'react'
import { useEffect, useState} from 'react';

// components
import Header from '../components/header/Header.jsx';
import Map from '../components/map/Map'
import List from '../components/list/List'

// API
import {getPalcesNearby} from '../api'

// redux
import { useDispatch, useSelector } from 'react-redux';
import {setCoordinates} from '../redux/locationSlice'
import {setPlaces} from '../redux/placeSlice'


import styled from 'styled-components';

const Container = styled.div`
    /* overflow:hidden  ; */
`

const Home = () => {

  const dispatch = useDispatch()
  const bounds = useSelector(state=>state.location.bounds)
  const coordinates = useSelector(state=>state.location.coordinates)

  //const [places,setPlaces] = useState([])
  const places = useSelector(state=>state.place.places)

  const [childClicked, setChildClicked] = useState(null)

  // once a user open the app, get their current location
  useEffect(() => {
    // built-in geolocation API
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      dispatch(
        setCoordinates({ lat: latitude, lng: longitude })
      )
      
    });
  }, []); // fire the function only once
  console.log('coordinates',coordinates); // {lat: 49.2417957, lng: -123.0468475}

  useEffect(()=>{
    if(bounds)  {
      getPalcesNearby(bounds.sw, bounds.ne)
      .then((data)=>{
        console.log(data.slice(0,10));
        dispatch(
          setPlaces(data) 
        )
        console.log('Places',places);
      })
    }
  },[coordinates,bounds]) // once coordinates or bounds get changed, fire the function

  return (
    <Container>
        <Header />
        <Map 
          //places={places}
          setChildClicked = {setChildClicked}
        />
        <List //places={places}
              childClicked={childClicked}/>
    </Container>
  )
}

export default Home