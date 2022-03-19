import React, { useEffect, useState } from 'react'

import './header.css'


// icons
import { LocalCafe, Money, SearchOutlined } from '@material-ui/icons';
import {RiMoneyDollarCircleLine} from 'react-icons/ri';
import {GrCafeteria} from 'react-icons/gr';
import {MdOutlineLocalCafe, MdOutlineShoppingCart} from 'react-icons/md';

// materialUI components
import { InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';


// redux
import {setPlaces} from '../../redux/placeSlice'
import {setCoordinates} from '../../redux/locationSlice'
import { useDispatch, useSelector } from 'react-redux';
import {setKinds} from '../../redux/kindSlice';
import {setRating} from '../../redux/ratingSlice';
// API
import {getPalcesNearby} from '../../api/index'
import { Autocomplete } from '@react-google-maps/api';


import styled from 'styled-components';

const Container = styled.div`
   position: absolute;
   z-index:1 ;


`
const Top = styled.div`
display:flex ;
`

const SearchWrapper = styled.div`
    display:flex ;
    align-items:center;

    border:1px solid var(--main-color);
    background-color:white ;
    border-radius:5px ;
    width:200px ;
    height:20px ;

    padding:5px ;
`
const RattingWrapper = styled.div`
    background-color:white ;
    width:200px ;
`

const IconWrapper = styled.div`
    margin-right:5px ;
`
const SearchInput =styled.input`
    border:none ;
    width: 100%;
`

const Chips = styled.div`
    display:flex ;
    overflow:scroll ;
`
const Chip = styled.button`
    display:flex ;
    background-color:white;
    border:var(--main-color) 1px solid ;
    border-radius:20px;
    padding: 5px 10px;

`


const Header = ({setFilterToggle} ) => {

    const bounds = useSelector(state=>state.location.bounds)
    const coordinates = useSelector(state=>state.location.coordinates)
    const choosedKinds = useSelector(state=>state.kind.kinds);
    const choosedRating = useSelector(state=>state.rating.rating);

    const  dispatch = useDispatch()

    const [autoComplete, setAutocomplete] = useState(null)

    const onLoad = (autoC)=> setAutocomplete(autoC)
    
    const onPlaceChanged =()=>{
        // to get the lmg and lat of the place
        const lat = autoComplete.getPlace().geometry.location.lat();
        const lng = autoComplete.getPlace().geometry.location.lng();

        dispatch(
            setCoordinates({lat, lng})
        )
    }

    const handleClickRating =(rating)=>{
        dispatch(
            setRating(rating)
        )
    }
    useEffect(()=>{
        if(bounds?.sw && bounds?.ne){
            getPalcesNearby( bounds.sw, bounds.ne, choosedKinds,choosedRating)
            .then((data)=>{
                console.log(data.slice(0,10));
                dispatch(
                  setPlaces(data) 
                )
            })
        }
    },[choosedRating])

    const handleClickKind = (kind)=>{
        dispatch(
            setKinds(kind)
          )
    }
    useEffect(()=>{
        if(bounds?.sw && bounds?.ne){  
            getPalcesNearby( bounds.sw, bounds.ne, choosedKinds,choosedRating)
            .then((data)=>{
                console.log(data.slice(0,10));
                dispatch(
                    setPlaces(data) 
                )
            })
        }
    },[choosedKinds])


  return (
    <Container>
        <Top>
            {/*  onLoad={onLoad} >>> specify what is going to happen once load <Autocomplete> component */}
            {/*  onPlaceChanged={onPlaceChanged} >>> specify what is going to happen once the user change the input */}
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                <SearchWrapper>

                    <IconWrapper>
                        <SearchOutlined />
                    </IconWrapper>

                    <SearchInput
                    placeholder="Search…"
                    />
                </SearchWrapper>
            </Autocomplete>

            <RattingWrapper>
                <FormControl  fullWidth variant="standard" >
                    <InputLabel id="rating" style={{fontSize:"1.2rem"}}>Rating</InputLabel>
                    <Select id="rating" 
                            labelId="rating"
                            value={choosedRating} 
                            label="Age"
                            onChange={(e)=>handleClickRating(e.target.value)} >
                    <MenuItem value="1">All</MenuItem>
                    <MenuItem value="2">Above 2</MenuItem>
                    <MenuItem value="3">Above 3</MenuItem>
                    <MenuItem value="4">Above 4</MenuItem>
                    </Select>
                </FormControl>
            </RattingWrapper>

        </Top>

        <Chips>
            <Chip onClick={()=>{handleClickKind('supermarkets')}}>
                <MdOutlineShoppingCart/>
                <span>Supermarkets</span>
            </Chip>

            <Chip onClick={()=>{handleClickKind('cafes')}}>
                <MdOutlineLocalCafe/>
                <span>Cafe</span>
            </Chip>

            <Chip onClick={()=>{handleClickKind('restaurants')}}>
                <GrCafeteria />
                <span>Restaurant</span>     
            </Chip>

            <Chip onClick={()=>{handleClickKind('atm')}}>
                <RiMoneyDollarCircleLine/>
                <span>ATM</span>     
            </Chip>
            <Chip onClick={()=>setFilterToggle(true)}>
                <span>More...</span>     
            </Chip>
        </Chips>

       



    </Container>
  )
}

export default Header