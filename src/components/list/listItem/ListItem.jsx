import React, { useEffect, useRef, useState } from 'react'

// api
import {getPalcesDetails} from '../../../api';

// materialUI component
import Rating from '@material-ui/lab/Rating';

// redux
import { useDispatch, useSelector } from 'react-redux';
import {setPlaces} from '../../../redux/placeSlice';
import {setKinds} from '../../../redux/kindSlice';

// API
import {getPalcesNearby} from '../../../api'

import styled from 'styled-components';

const Container = styled.div`
  border:1px solid var(--main-color) ;
  min-width:200px;
  margin:5px ;
  padding:5px ;

  display: flex;
  flex-direction: column;
  justify-content:space-around ;


`

const Info = styled.div`
  flex:1;
`
const Title = styled.p`
  font-size:1.2rem ;
  font-weight:600 ;
  margin:0 ;
`
const SubInfoWrapper = styled.div`
display:flex ;
align-items:center ;
justify-content:space-between ;

padding: 2px 5px 2px 0 ;
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

const ImageWrapper = styled.div`
  flex:1;
`
const Image = styled.img`
width:100%;
height:110px ;
margin:auto ; 
/* width:200px;
height:120px ; */
object-fit:cover;

`
const Address = styled.div``
const Desc = styled.div`
flex:3;
overflow:scroll ;
`

const ListItem = ({place, selected }) => {

  const bounds = useSelector(state=>state.location.bounds)
  const choosedKinds = useSelector(state=>state.kind.kinds);
  const choosedRating = useSelector(state=>state.rating.rating);
  const  dispatch = useDispatch()

  const [details, setDetails] = useState({})

  console.log(place.properties.rate);
  //console.log({selected});
  const  selectedItem = useRef()
  if (selected) {
    selectedItem?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  useEffect(()=>{
    const xid = place.properties.xid
       getPalcesDetails(xid)
       .then((data)=>{
         //setIsDetailOpen(true)
         console.log(data);
         setDetails(data)
       })
  },[])
  //console.log({details});



  const handleClickKind = ()=>{
      const kind = place.properties.kinds.split(",")[0]
      dispatch(
        setKinds(kind)
      )

  }
  useEffect(()=>{
    getPalcesNearby( bounds.sw, bounds.ne, choosedKinds, choosedRating)   //  getPalcesNearby() >>> async func returning a promise
    .then((data)=>{
      console.log(data.slice(0,10));
      dispatch(
        setPlaces(data) 
      )
    })
  },[choosedKinds])
  
  return (
    
    <Container ref={selectedItem}>
      <ImageWrapper >
          <Image src={ details.preview?.source 
                      ? details.preview.source
                      :"https://e7.pngegg.com/pngimages/909/221/png-clipart-comingsoon-comingsoon-coming-soon-thumbnail.png"
                    } 
                alt={details.name}/> 
      </ImageWrapper>
        <Info>
          <Title > {place.properties.name}</Title>
          <Address>
              {details.address &&  details.address.city},
              {details.address &&  details.address.county},
              {details.address && details.address.country} 
          </Address>

          <SubInfoWrapper>
            <Rating name="read-only" value={place.properties.rate} readOnly />
            <Chips>
              <Chip onClick={handleClickKind}>
                                                    {/* gardens_and_parks >>> gardens and parks */}
                {place.properties.kinds.split(",")[0].replaceAll("_"," ")} 
              </Chip>
            </Chips>
          </SubInfoWrapper>
        </Info>
        <Desc>
            {details.wikipedia_extracts?.text 
            ? details.wikipedia_extracts.text
            : "peding to be updated"}
        </Desc>
  
    </Container>
  )
}

export default ListItem