

import styled from 'styled-components';

export const Container = styled.div`
    position:relative;
    height:100vh ;
    overflow:hidden ;
`
export const ListPanel = styled.div`
    position:absolute;
    z-index:10 ;
    bottom:${(props)=>props.status==="showAll" ? "0px" : "-250px"} ;

    width:100vw ;


`
export const ArrowIcon = styled.div`
    /* position:absolute;
    z-index:99; */
    width:100px;
    height:40px;
    bottom:${(props)=>props.direction==="down" ? "280px" : "50px"} ;
    
    /* to center */
    right:0;
    left:0;
    margin:auto ;
    

    color:var(--dark-gray) ;
    /* border: solid var(--main-color) 1px ; */
    border-top-right-radius:40%;
    border-top-left-radius:40%;
    background-color: white;
    box-shadow: 0 0 5px #ccc;
    display:flex ; 
    justify-content:space-between ;
    align-items:center ;
    padding:5px 20px 0  20px;
`
export const Result = styled.div`
  span{
    font-size:1.4rem ;
  }
`
