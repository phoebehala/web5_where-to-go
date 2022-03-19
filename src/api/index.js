import axios from "axios";

const URL = 'https://opentripmap-places-v1.p.rapidapi.com/en/places/bbox'

// aync function return a promise
export const getPalcesNearby = async(sw, ne, choosedKinds, choosedRating)=>{
  console.log(choosedKinds);
    try {
        const res = await axios.get(URL,{
          params: {
            lon_max: ne.lng, // -122.99584417104494
            lat_min: sw.lat, //49.219606846173264
            lon_min: sw.lng, //-123.0816748595215
            lat_max: ne.lat, //49.262195072249426
            kinds: choosedKinds || [],
            rate: choosedRating || '1'
          },
          headers: {
            'x-rapidapi-host': 'opentripmap-places-v1.p.rapidapi.com',
            'x-rapidapi-key': '36d0287890msh9909e4f0304fb9ap169b23jsne7e772bb61a5'
          }
        });
        console.log(res); //{data:{},status:200, statusText: 'OK', headers: {…}, config: {…}, …}}
        //console.log(res.data.features);
        return res.data.features
    } catch (error) {
        console.log(error);
    }
}



export const getPalcesDetails = async(xid)=>{
  try {
      const res = await axios.get(`https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/${xid}`,{
        headers: {
          'x-rapidapi-host': 'opentripmap-places-v1.p.rapidapi.com',
          'x-rapidapi-key': '36d0287890msh9909e4f0304fb9ap169b23jsne7e772bb61a5'
        }
      });
      console.log(res); //{data:{},status:200, statusText: 'OK', headers: {…}, config: {…}, …}}
      //console.log(res.data.features);
      return res.data
  } catch (error) {
      console.log(error);
  }
}