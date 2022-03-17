import React, { useEffect, useState } from 'react'

// ant component
import { Checkbox, Collapse } from 'antd';

// redux
import { useDispatch, useSelector } from 'react-redux';
import {setPlaces} from '../../redux/placeSlice'
// API
import {getPalcesNearby} from '../../api/index'

import styled from 'styled-components';
const Container = styled.div`
position:absolute ;
z-index:999 ;
`

const { Panel } = Collapse 

const KINDS = [
  {
      "_id": 0,
      "name": "other_hotels"
  },
  {
      "_id": 1,
      "name": "resorts"
  },
  {
      "_id": 2,
      "name": "guest_houses"
  },
  {
      "_id": 3,
      "name": "apartments"
  },
]


const Filter = () => {
  const [checkedIndex, setCheckedIndex] = useState([])
  const [checkedKinds, setCheckedKinds] = useState([])

  const bounds = useSelector(state=>state.location.bounds);
  const  dispatch = useDispatch();

  console.log({bounds});

  const handleToggle = (id)=>{
    console.log({id});

    const currentIndexExist = checkedIndex.indexOf(id) // to get the index of item the user checked
    console.log({currentIndexExist});
    const newCheckedIndex = [...checkedIndex]

    if(currentIndexExist === -1) {   // -1 means it doensn't exist inside checkedIndex
      newCheckedIndex.push(id)
      console.log({newCheckedIndex});
      //newCheckedKinds.push(KINDS[id].name)
  
    }else{ // the current kind has already checked, so we need to get rid of it
      newCheckedIndex.splice(currentIndexExist,1)
      //newCheckedKinds.splice(currentKindIndex,1)
    }
    setCheckedIndex(newCheckedIndex) 
    let newCheckedKinds=[]
    for(let j=0; j<newCheckedIndex.length; j++){
      newCheckedKinds.push(KINDS[j].name)
    }
    //console.log({newCheckedKinds});
    setCheckedKinds(newCheckedKinds)
  }
  console.log({checkedIndex});
  console.log({checkedKinds});  //['resorts', 'guest_houses', 'apartment']

  // turn arr to be a string which is the format for fetching API
  console.log(checkedKinds.join()); // resorts,guest_houses,apartment
  const kindsStr= checkedKinds.join()

  useEffect(()=>{
    if(bounds) {
      console.log('fetching.....');
      getPalcesNearby( bounds.sw, bounds.ne, kindsStr)
      .then((data)=>{
          console.log(data?.slice(0,10));
          dispatch(
            setPlaces(data) 
          )
      })
    }
  },[checkedKinds])

  return (
    <Container >
        <Collapse defaultActiveKey={['0']} >
            <Panel header="Kinds" key="1">
              {KINDS.map((value,i)=>(
                <React.Fragment key={i}>
                  <Checkbox onChange={()=>handleToggle(value._id)}
                            type="checkbox"
                           
                  />
                  <span>{value.name}</span>
                </React.Fragment>
              ))}
            </Panel>
        </Collapse>

        <Collapse defaultActiveKey={['0']} >
            <Checkbox >
                Check all accomodations
            </Checkbox>
            <CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />

        </Collapse>
      
    </Container >
  )
}

export default Filter