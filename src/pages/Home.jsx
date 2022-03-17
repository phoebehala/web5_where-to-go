import React from 'react'
import { useEffect, useState} from 'react';

// components
import Header from '../components/header/Header.jsx';
import Map from '../components/map/Map'
import List from '../components/list/List'

//icons
import { KeyboardArrowDown, KeyboardArrowUp} from '@material-ui/icons';

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
const ArrowIcon = styled.div`
    position:absolute;
    z-index:99;

    bottom:${(props)=>props.direction==="down" ? "280px" : "0px"} ;
    
    left:50%;
    transform: translateX(-50%);

    color:var(--dark-gray) ;
    border: solid var(--main-color) 1px ;
    border-radius:50%;
    background-color: white;
    box-shadow: 0 0 5px #ccc;
    display:flex ;
    
`

const Home = () => {

  const dispatch = useDispatch()
  const bounds = useSelector(state=>state.location.bounds)
  const coordinates = useSelector(state=>state.location.coordinates)

  //const [places,setPlaces] = useState([])
  const places = useSelector(state=>state.place.places)

  const [childClicked, setChildClicked] = useState(null)


  const [toggle, setToggle ] =useState(false);
  const handleShowList =()=>{
    setToggle(!toggle)
    console.log(toggle);
}

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
      })
    }
  },[coordinates,bounds]) // once coordinates or bounds get changed, fire the function
console.log({places});
  return (
    <Container>
        <Header />
        <Map 
          setChildClicked = {setChildClicked}
        />

        {toggle && (
         <>
            <ArrowIcon direction="down">
                  <KeyboardArrowDown  style={{width:"30px", height:"100%"}}
                                      onClick={handleShowList}/>
            </ArrowIcon>
            <List 
                childClicked={childClicked}
            />
          </>
          
        )}

        {!toggle && (
          <>
            <ArrowIcon direction="up">
                  <KeyboardArrowUp style={{width:"30px", height:"100%"}}
                                  onClick={handleShowList}></KeyboardArrowUp>
            </ArrowIcon>
          </>

        )}

    </Container>
  )
}

export default Home