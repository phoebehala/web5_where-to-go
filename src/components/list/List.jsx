import React,{useEffect, useState, createRef} from 'react'

// MaterialUI components
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

// components
import ListItem from './listItem/ListItem';

// redux
import {setCoordinates, setBounds} from '../../redux/locationSlice'
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

const Container = styled.div`
   position:absolute;
   z-index:10 ;
   height:100px ;
   width:100% ;
   bottom:0 ;
   background-color:white ;

   padding: 10px 5px;

   display:flex;

   overflow: scroll;
`

const List = ({ childClicked}) => {

  const places = useSelector(state=>state.place.places)

  // in order to access the listItem a user clicked
  // at the start, there is no any places so elementIndex is an empty arr
  const [elementsIndex, setElementsIndex] = useState([]); 
  useEffect(()=>{
    // set index for all listItem
    setElementsIndex(Array(places.length).map((_, i) => i))
  },[places]) // fire the function whenver places get changed

  //console.log({elementRefs});
  //console.log({childClicked});

  return (
    <Container>
     { console.log(places)}
     
      {/* {places?.map()  } */}
      {places && places.map( (place,i)=>(
        <ListItem place={place} key={i} 
                  selected={Number(childClicked) === i} 
                  />
      )
        )}

    </Container>
  )
}

export default List