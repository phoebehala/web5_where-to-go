import React, { useEffect, useState } from 'react'

// ant component
import { Checkbox, Collapse } from 'antd';

// redux
import { useDispatch, useSelector } from 'react-redux';
import {setPlaces} from '../../redux/placeSlice';
import {setKinds} from '../../redux/KindSlice';
// API
import {getPalcesNearby} from '../../api/index'

// style
import {tablet, mobile} from '../../util/responsive';
import './filter.css';
import styled from 'styled-components';
const Container = styled.div`
  position:absolute ;
  top:80px;

  right:0px;
  left: 0px;
  margin: auto;

  z-index:999 ;
  background-color:white ;
  width:350px ;
  max-height: 70vh;
  padding:5% 5%;
  overflow:scroll;

  ${mobile({width:"50vw"})};
`
const KindsFilterWrapper  = styled.div`
  display:flex ;
  flex-direction:row ;
  justify-content:space-between ;
  align-items:flex-start ;
  ${mobile({flexDirection:"column"})};
`
const TopWrapper=styled.div`
    display:flex ;
    justify-content:space-between ;
`
const Result = styled.div`
  span{
    font-size:1.4rem ;
  }
`
const Done = styled.button`
`

const { Panel } = Collapse 

const defaultCheckedList = [''];
const adultOptions = ['alcohol', 'casino'];
const accomodationsOptions =['other hotels','hostels','resorts','guest houses','apartments']
const amusementsOptions = ['baths and saunas','amusement parks','water parks' ]
const interestingOptions = ['architecture','cultural','historic', 'industrial facilities','natural','other','religion','sport']
const touristOptions = ['foods','banks','shops','transport' ]


const Filter = ( {setFilterToggle} ) => {
  /*filter*/
  const [accomodations, setAccomodations] = useState([]);
  const [adult, setAdult] = useState([]);
  const [amusements, setAmusements] = useState([]);
  const [interestingPlaces, setInterestingPlaces] = useState([]);
  const [touristFacilities, setTouristFacilities] =useState([]);


  const [checkedList, setCheckedList] = useState(accomodations.concat(amusements));
  const [checkedStr, setCheckedStr]  = useState('');


  const bounds = useSelector(state=>state.location.bounds);
  const places = useSelector(state=>state.place.places);
  const choosedKinds = useSelector(state=>state.kind.kinds);

  const  dispatch = useDispatch();
  console.log({bounds});

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

// console.log({accomodations});
// console.log({amusements});
// console.log({checkedList});
// console.log({checkedStr});

useEffect(()=>{
  dispatch(
    setKinds(checkedStr)
  )
},[checkedStr])

  useEffect(()=>{
    if(bounds) {
      console.log(`fetching.....${choosedKinds}`);
      getPalcesNearby( bounds.sw, bounds.ne, choosedKinds)
      .then((data)=>{
          console.log(data?.slice(0,10));
          dispatch(
            setPlaces(data) 
          )
      })
    }
  },[choosedKinds])

  return (
    <Container >
      <TopWrapper>
        <Done onClick={()=>setFilterToggle(false)}>Done</Done>

        <Result>
          <span>Result: <b>{places?places.length:0}</b></span>
        </Result>

      </TopWrapper>

      <KindsFilterWrapper>
        <Collapse defaultActiveKey={['1']} >
            <Panel header="accomodations" key="1">
              <Checkbox.Group options={accomodationsOptions} onChange={(e)=>accomodationsOnChange(e)}></Checkbox.Group >
            </Panel>
            <Panel header="adult" key="2">
              <Checkbox.Group options={adultOptions} onChange={(e)=>adultOnChange(e)}></Checkbox.Group >
            </Panel>
            <Panel header="amusements" key="3">
              <Checkbox.Group options={amusementsOptions} onChange={(e)=>amusementsOnChange(e)}></Checkbox.Group >
            </Panel>
          </Collapse>
   
          <Collapse defaultActiveKey={['0']} >
            <Panel header="interesting places" key="4">
              <Checkbox.Group options={interestingOptions} onChange={(e)=>interestingPlacesOnChange(e)}></Checkbox.Group >
            </Panel>
            <Panel header="tourist facilities" key="5">
              <Checkbox.Group options={touristOptions} onChange={(e)=>touristFacilitiesOnChange(e)}></Checkbox.Group >
            </Panel>
        </Collapse>
      </KindsFilterWrapper>
      
    </Container >
  )
}

export default Filter