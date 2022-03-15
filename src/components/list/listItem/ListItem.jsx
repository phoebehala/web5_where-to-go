import React, { useEffect, useRef, useState } from 'react'

// api
import {getPalcesDetails} from '../../../api';

// materialUI component
import Rating from '@material-ui/lab/Rating';

// redux
import { useDispatch, useSelector } from 'react-redux';
import {setPlaces} from '../../../redux/placeSlice'

// API
import {getPalcesNearby} from '../../../api'

import styled from 'styled-components';

const Container = styled.div`
  border:1px solid var(--main-color) ;
  min-width:150px;
  margin:5px ;
  padding:5px ;

  display: flex;
  flex-direction: column;
  justify-content:space-around ;

`
const Title = styled.p`
  font-size:1.2rem ;
  font-weight:600 ;
  margin:0 ;

`
const Chips = styled.div`
`
const Chip = styled.button`
    background-color:white;
    border:var(--main-color) 1px solid ;
    border-radius:20px;
    padding: 5px;
    font-size:1rem ;
`


const ListItem = ({place, selected }) => {

  const bounds = useSelector(state=>state.location.bounds)
  const  dispatch = useDispatch()

  const [isDetailOpen, setIsDetailOpen] = useState(false)

  console.log(place.properties.rate);
  //console.log({selected});
  const  selectedItem = useRef()
  if (selected) {
    selectedItem?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }


  //if (selected) console.log('selected!! ',selectedItem.current);

  const handleClickTitle = ()=>{
    const xid = place.properties.xid
    getPalcesDetails(xid)
    .then((data)=>{
      setIsDetailOpen(true)
      console.log(data);
    })
  }


  const handleClickKind = ()=>{
      const kind = place.properties.kinds.split(",")[0]
      getPalcesNearby( bounds.sw, bounds.ne, kind)   //  getPalcesNearby() >>> async func returning a promise
      .then((data)=>{
        console.log(data.slice(0,10));
        dispatch(
          setPlaces(data) 
        )
      })

  }
  
  return (
    <Container ref={selectedItem}>
      <Title onClick={handleClickTitle}> {place.properties.name}</Title>
      <Rating name="read-only" value={place.properties.rate} readOnly />

      <Chips>
        <Chip onClick={handleClickKind}>
                                              {/* gardens_and_parks >>> gardens and parks */}
          {place.properties.kinds.split(",")[0].replaceAll("_"," ")} 
        </Chip>
      </Chips>


    </Container>
  )
}

export default ListItem