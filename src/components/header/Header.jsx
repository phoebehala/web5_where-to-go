import React, { useState } from 'react'

// import { CardContainer} from "./Card.styles";

// icons
import { LocalCafe, Money, SearchOutlined } from '@material-ui/icons';
import {RiMoneyDollarCircleLine} from 'react-icons/ri';
import {GrCafeteria} from 'react-icons/gr';
import {MdOutlineLocalCafe, MdOutlineShoppingCart} from 'react-icons/md';

// redux
import {setPlaces} from '../../redux/placeSlice'
import {setCoordinates} from '../../redux/locationSlice'
import { useDispatch, useSelector } from 'react-redux';
// API
import {getPalcesNearby} from '../../api/index'
import { Autocomplete } from '@react-google-maps/api';


import styled from 'styled-components';
const Container = styled.div`
   position: absolute;
   z-index:1 ;
`
const SearchWrapper = styled.div`
    display:flex ;
    align-items:center;

    border:1px solid var(--main-color);
    border-radius:5px ;
    width:150px ;
    height:100% ;

    padding:5px ;
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

    const handleClickKind = (kind)=>{
        getPalcesNearby( bounds.sw, bounds.ne, kind)
        .then((data)=>{
            console.log(data.slice(0,10));
            dispatch(
              setPlaces(data) 
            )
        })
    }

  return (
    <Container>
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