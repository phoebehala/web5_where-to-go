import styled from 'styled-components';

export const Container = styled.div`
   position: absolute;
   z-index:1 ;

   padding:10px ;
`
export const Top = styled.div`
    display:flex ;
    align-items: center;
`

export const SearchWrapper = styled.div`
    display:flex ;
    align-items:center;

    /* border:1px solid var(--main-color); */
    box-shadow: 1px 1px 2px grey;   
    background-color:white ;
    border-radius:5px ;
    width:150px ;
    height:25px ;

    padding:5px ;
`
export const RattingWrapper = styled.div`
    background-color: white;
    width:100px ;

    margin-left:15px ;
`

export const IconWrapper = styled.div`
    margin-right:5px ;

`
export const SearchInput =styled.input`
    border:none ;
    width: 100%;
`

export const Chips = styled.div`
    display:flex ;
    width:100vw ;
    overflow:scroll ;

    margin-top:10px;

`
export const Chip = styled.button`
    display:flex ;
    background-color:white;

    border:none ;
    box-shadow: 1px 1px 2px grey;   

    border-radius:20px;
    padding: 5px 10px;
    margin:0 3px ;

    span{
        margin-left:3px ;
    }
`

