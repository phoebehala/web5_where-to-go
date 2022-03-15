import React from 'react'

// import { CardContainer} from "./Card.styles";

// icons
import { LocalCafe, Money, SearchOutlined } from '@material-ui/icons';
import {RiMoneyDollarCircleLine} from 'react-icons/ri';
import {GrCafeteria} from 'react-icons/gr';
import {MdOutlineLocalCafe, MdOutlineShoppingCart} from 'react-icons/md';

// redux
import {fetchDataByKinds} from '../../redux/KindSlice'
import { useDispatch, useSelector } from 'react-redux';

// API
import {getPalcesNearby} from '../../api/index'


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
`
const Chip = styled.button`
    display:flex ;
    background-color:white;
    border:var(--main-color) 1px solid ;
    border-radius:20px;
    padding: 5px 10px;

`

const Header = () => {

    const bounds = useSelector(state=>state.location.bounds)
    const coordinates = useSelector(state=>state.location.coordinates)

    const handleClickKind = (kind)=>{
        getPalcesNearby( bounds.sw, bounds.ne, kind)

    }

  return (
    <Container>
        <SearchWrapper>

            <IconWrapper>
              <SearchOutlined />
            </IconWrapper>

            <SearchInput
              placeholder="Search…"
            />
        </SearchWrapper>

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
        </Chips>

       



    </Container>
  )
}

export default Header