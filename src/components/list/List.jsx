import React from 'react'

// MaterialUI components
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

// components
import ListItem from '../listItem/ListItem';

import styled from 'styled-components';

const Container = styled.div`
   position:absolute;
   z-index:10 ;
   height:100px ;
   width:100% ;
   bottom:0 ;
   background-color:tomato ;

   padding: 10px 5px;

   display:flex;
`

const List = () => {
  const places = [
    {"placeName":"place1"},
    {"placeName":"place2"},
    {"placeName":"place3"}
  ]

  return (
    <Container>
     { console.log(places)}
     
      {/* {places?.map()  } */}
      {places && places.map( (place,i)=>(
        <ListItem place={place} key={i}/>
      )
        )}

    </Container>
  )
}

export default List