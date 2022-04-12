import React from 'react'
import { useEffect, useState} from 'react';


// components
import Header from '../components/header/Header.jsx';
import Map from '../components/map/Map'
import List from '../components/list/List'
import Filter from '../components/filter/Filter'

//icons
import { KeyboardArrowDown, KeyboardArrowUp} from '@material-ui/icons';

// API
import {getPalcesNearby} from '../api'

// redux
import { useDispatch, useSelector } from 'react-redux';
import {setCoordinates} from '../redux/locationSlice'
import {setPlaces} from '../redux/placeSlice'
import {setToggle} from '../redux/ListToggleSlice'

// styles
import {Container, ListPanel, ArrowIcon, Result} from './home.styles'


const Home = () => {

  const dispatch = useDispatch()
  const bounds = useSelector(state=>state.location.bounds)
  const coordinates = useSelector(state=>state.location.coordinates)
  const choosedKinds = useSelector(state=>state.kind.kinds);
  const choosedRating = useSelector(state=>state.rating.rating);
  const toggle = useSelector(state => state.listToggle.toggle)

  //const [places,setPlaces] = useState([])
  const places = useSelector(state=>state.place.places)

  const [isMapLoading, setIsMapLoading] = useState(false)
  const [childClicked, setChildClicked] = useState(null)

  const [filterToggle, setFilterToggle ] =useState(false);
  // const [toggle, setToggle ] =useState(false);
  const handleShowList =()=>{
      dispatch(
        setToggle(true)
      )
  }
  const handleCloseList =()=>{
    dispatch(
      setToggle(false)
    )
}
console.log({toggle});

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
    setIsMapLoading(true)
    if(bounds)  {
      getPalcesNearby(bounds.sw, bounds.ne,choosedKinds,choosedRating)
      .then((data)=>{
        console.log(data?.slice(0,10));
        setIsMapLoading(false)
        dispatch(
          setPlaces(data) 
        )
      })
    }
  },[coordinates,bounds]) // once coordinates or bounds get changed, fire the function
console.log({places});
  return (
    <Container>
        <Header setFilterToggle={setFilterToggle }/>
        {filterToggle &&(
            <Filter setFilterToggle={setFilterToggle }/>
        )}
        <Map 
          setChildClicked = {setChildClicked}
          isMapLoading = {isMapLoading}
        />

 {toggle ? (

        <ListPanel status="showAll">
            <ArrowIcon direction="down">
                  <Result>
                    <span>Result: <b>{places?places.length:0}</b></span>
                  </Result>

                  <KeyboardArrowDown style={{width:"30px", height:"100%"}}
                                  onClick={handleCloseList} />
            </ArrowIcon>
            

            <List 
                childClicked={childClicked}
                setChildClicked = {setChildClicked}
            />

        </ListPanel>
):(
          <ListPanel status="showHalf">
            <ArrowIcon direction="up">
                <Result>
                    <span>Result: <b>{places?places.length:0}</b></span>
                </Result>   

                <KeyboardArrowUp style={{width:"30px", height:"100%"}}
                                  onClick={handleShowList} />
         
            </ArrowIcon>

            <List 
                childClicked={childClicked}
                setChildClicked = {setChildClicked}
            />

        </ListPanel>
)}


    </Container>
  )
}

export default Home