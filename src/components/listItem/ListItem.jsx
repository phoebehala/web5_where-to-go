import React, { useRef } from 'react'


import styled from 'styled-components';

const Container = styled.div`
  border:1px solid var(--main-color) ;

  
  .title{
    width:100px;
    height:200px ;
  }
`


const ListItem = ({place, selected }) => {
  //console.log(place);
  //console.log({selected});
  const  selectedItem = useRef()
  if (selected) selectedItem?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //if (selected) console.log('selected!! ',selectedItem.current);
  
  return (
    <Container>
      <div ref={selectedItem} className='title'>{place.properties.name}</div>
    </Container>
  )
}

export default ListItem