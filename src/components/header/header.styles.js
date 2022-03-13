import styled from 'styled-components';

export const Container = styled.div`
   
`
export  const SearchWrapper = styled.div`
    display:flex ;
    align-items:center;

    border:1px solid var(--main-color);
    border-radius:5px ;
    width:150px ;
    height:100% ;

    padding:5px ;
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
`
export const Chip = styled.button`
    display:flex ;
    background-color:white;
    border:var(--main-color) 1px solid ;
    border-radius:20px;
    padding: 5px 10px;

`
