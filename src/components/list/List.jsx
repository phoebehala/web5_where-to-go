import React,{useEffect, useState, createRef, useRef} from 'react'

// MaterialUI components
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

// components
import ListItem from './listItem/ListItem';

// redux
import {setCoordinates, setBounds} from '../../redux/locationSlice'
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

const Container = styled.div`
   /* position:absolute;
   z-index:10 ; */
   height:280px ;
   /* width:100% ; */
   /* bottom:0 ; */
   background-color:white ;

   padding: 20px 5px 0px 5px;

   display:flex;

   overflow: scroll;
`

const List = ({ childClicked, setChildClicked}) => {

  const places = useSelector(state=>state.place.places)

  // to get rid of style.border when there is no result
  useEffect(()=>{
    if(places?.length ===0){
      setChildClicked(undefined)
    }
  },[places])

/*
  // in order to access the listItem a user clicked
  // at the start, there is no any places so elementIndex is an empty arr
  const [elementsIndex, setElementsIndex] = useState([]); 
  useEffect(()=>{
    // set index for all listItem
    setElementsIndex(Array(places.length).map((_, i) => i))
  },[places]) // fire the function whenver places get changed
*/
  //console.log({elementRefs});
  //console.log({childClicked});

  const  listItemsRef = useRef()
  console.log({listItemsRef});

  if(childClicked){ // childClicked >>> the index the user click
    //console.log(listItemsRef.current.children);
    //console.log(listItemsRef.current.children[childClicked]);
    const listItems = listItemsRef.current.children
    for(let i=0; i<listItems.length; i++){ // reset border for each listItem
      listItems[i].style.border=`1px solid var(--main-color)`

      // only applied specific style for clicked listItem
      if (listItems[childClicked]){
        listItems[childClicked].style.border=`2px double red`
      }

    }
  }

  return (
    <Container ref={listItemsRef}>
     {/* { console.log(places)} */}
      {
        places && places?.length ===0 && (
          <p>There is no any places matching the request</p>
        )
    
      }

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