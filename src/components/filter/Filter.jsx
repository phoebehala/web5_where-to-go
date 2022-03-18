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
  background-color:white ;
  width:50vw ;

`

const { Panel } = Collapse 
const CheckboxGroup = Checkbox.Group;
const defaultCheckedList = [''];
const adultOptions = ['alcohol', 'casino'];
const accomodationsOptions =['other hotels','hostels','resorts','guest houses','apartments']
const amusementsOptions = ['baths and saunas','amusement parks','water parks' ]
const interestingOptions = ['architecture','cultural','historic', 'industrial facilities','natural','other','religion','sport']
const touristOptions = ['foods','banks','shops','transport' ]

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
  /*filter*/
  const [accomodations, setAccomodations] = useState([]);
  const [adult, setAdult] = useState([]);
  const [amusements, setAmusements] = useState([]);
  const [interestingPlaces, setInterestingPlaces] = useState([]);
  const [touristFacilities, setTouristFacilities] =useState([]);


  const [checkedList, setCheckedList] = useState(accomodations.concat(amusements));
  const [checkedStr, setCheckedStr]  = useState('');

  const [checkedIndex, setCheckedIndex] = useState([])
  const [checkedKinds, setCheckedKinds] = useState([])



  const bounds = useSelector(state=>state.location.bounds);
  const  dispatch = useDispatch();
  console.log({bounds});

    /*filter*/
/*
  const onChange = list => {
    console.log({list});
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < adultOptions.length);
    setCheckAll(list.length === adultOptions.length);
  };

  const onCheckAllChange = e => {
    console.log(e);
    setCheckedList(e.target.checked ? adultOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };
*/
const accomodationsOnChange = (newCheckedKindArr)=>{
    console.log(newCheckedKindArr);
    setAccomodations(newCheckedKindArr)
}
const adultOnChange = (newCheckedKindArr)=>{
  console.log(newCheckedKindArr);
  setAdult(newCheckedKindArr)
}
const amusementsOnChange = (newCheckedKindArr)=>{
  console.log(newCheckedKindArr);
  setAmusements(newCheckedKindArr)
}
const interestingPlacesOnChange = (newCheckedKindArr)=>{
  console.log(newCheckedKindArr);
  setInterestingPlaces(newCheckedKindArr)
}
const touristFacilitiesOnChange = (newCheckedKindArr)=>{
  console.log(newCheckedKindArr);
  setTouristFacilities(newCheckedKindArr)
}
useEffect(()=>{
  const newCheckedList= accomodations.concat(adult).concat(amusements).concat(interestingPlaces).concat(touristFacilities)
  console.log({newCheckedList});
  setCheckedList(newCheckedList);

  const newFormatCheckedList =[]
  for(let element of newCheckedList){
    let newElement = element.replaceAll(" ","_")
    newFormatCheckedList.push(newElement)
  }
  setCheckedStr(newFormatCheckedList.join())

},[accomodations,adult,amusements,interestingPlaces,touristFacilities])


console.log({accomodations});
console.log({amusements});
console.log({checkedList});
console.log({checkedStr});

  const handleToggle = (id)=>{
    //console.log({id});

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
  //console.log({checkedIndex});
  //console.log({checkedKinds});  //['resorts', 'guest_houses', 'apartment']

  // turn arr to be a string which is the format for fetching API
  //console.log(checkedKinds.join()); // resorts,guest_houses,apartment


  useEffect(()=>{
    if(bounds) {
      console.log(`fetching.....${checkedStr}`);
      getPalcesNearby( bounds.sw, bounds.ne, checkedStr)
      .then((data)=>{
          console.log(data?.slice(0,10));
          dispatch(
            setPlaces(data) 
          )
      })
    }
  },[checkedStr])

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
          <Panel header="accomodations" key="1">
            <Checkbox.Group options={accomodationsOptions} onChange={(e)=>accomodationsOnChange(e)}></Checkbox.Group >
          </Panel>
          <Panel header="adult" key="2">
            <Checkbox.Group options={adultOptions} onChange={(e)=>adultOnChange(e)}></Checkbox.Group >
          </Panel>
          <Panel header="amusements" key="3">
            <Checkbox.Group options={amusementsOptions} onChange={(e)=>amusementsOnChange(e)}></Checkbox.Group >
          </Panel>
          <Panel header="interesting_places" key="4">
            <Checkbox.Group options={interestingOptions} onChange={(e)=>interestingPlacesOnChange(e)}></Checkbox.Group >
          </Panel>
          <Panel header="tourist_facilities" key="5">
            <Checkbox.Group options={touristOptions} onChange={(e)=>touristFacilitiesOnChange(e)}></Checkbox.Group >
          </Panel>
          


        </Collapse>
      
    </Container >
  )
}

export default Filter