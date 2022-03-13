import React from 'react'


import styled from 'styled-components';

const Container = styled.div`
  border:1px solid var(--main-color) ;

  
  .title{
    width:100px;
    height:200px ;
  }
`


const ListItem = ({place}) => {
  console.log(place);

  return (
    <Container>
      <div className='title'>{place.placeName}</div>
    </Container>
  )
}

export default ListItem