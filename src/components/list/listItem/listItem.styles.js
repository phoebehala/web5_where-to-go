import styled from 'styled-components';

export const Container = styled.div`
  max-width:250px ;

  border:1px solid var(--main-color) ;
  margin:5px ;
  padding:5px ;

  display: flex;
  flex-direction: column;
  justify-content:space-around ;

`

export const Info = styled.div`
  min-width:200px ;

  flex:1;
`
export const Title = styled.p`
  font-size:1.2rem ;
  font-weight:600 ;
  margin:0 ;
`
export const SubInfoWrapper = styled.div`
  min-width:200px ;

  display:flex ;
  align-items:center ;
  justify-content:space-between ;

  padding: 2px 5px 2px 0 ;
`
export const Chips = styled.div`
`
export const Chip = styled.button`
  background-color:white;
  border:var(--main-color) 1px solid ;
  border-radius:20px;
  padding: 5px;
  font-size:1rem ;
  cursor: pointer;
`

export const ImageWrapper = styled.div`
  flex:1;
`
export const Image = styled.img`
width:100%;
height:110px ;
margin:auto ; 
/* width:200px;
height:120px ; */
object-fit:cover;

`
export const Address = styled.div`
  display:flex ;
  justify-content:flex-start ;
  align-items:center ;
  margin:4px 0;

`
export const Desc = styled.div`
  min-width:200px ;
  flex:3;
  overflow:scroll ;
`