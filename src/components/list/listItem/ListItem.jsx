import React, { useEffect, useRef, useState } from 'react'

// api
import {getPalcesDetails} from '../../../api';

// materialUI component
import Rating from '@material-ui/lab/Rating';
import { CircularProgress } from '@material-ui/core';

// redux
import { useDispatch, useSelector } from 'react-redux';
import {setPlaces} from '../../../redux/placeSlice';
import {setKinds} from '../../../redux/KindSlice';

// API
import {getPalcesNearby} from '../../../api'

// icons
import { Room } from '@material-ui/icons';

// styles
import {Container, Info, Title, SubInfoWrapper, Chips, Chip, ImageWrapper, Image, Address, Desc } from './listItem.styles.js'


const ListItem = ({place, selected }) => {

  const bounds = useSelector(state=>state.location.bounds)
  const choosedKinds = useSelector(state=>state.kind.kinds);
  const choosedRating = useSelector(state=>state.rating.rating);
  const toggle = useSelector(state => state.listToggle.toggle)
  const  dispatch = useDispatch()

  const [details, setDetails] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  //console.log(place.properties.rate);
  //console.log({selected});
  const  selectedItem = useRef()
  if (selected && toggle===true) {
    selectedItem?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  useEffect(()=>{
    const xid = place.properties.xid
    setIsLoading(true)
    getPalcesDetails(xid)
      .then((data)=>{
         //setIsDetailOpen(true)
         console.log(data);
         setDetails(data)
         setIsLoading(false)
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

    {isLoading?(
      <div style={{margin:'auto'}}>
        <CircularProgress size={'5rem'} />
      </div>
    ):(
    <>
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
            <Room/>
            <>
              {details.address &&  details.address.city},
              {details.address &&  details.address.county},
              {details.address && details.address.country} 
            </>
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
            : "pending to be updated"}
        </Desc>
    </>
  )
}

    </Container>
  )
}

export default ListItem