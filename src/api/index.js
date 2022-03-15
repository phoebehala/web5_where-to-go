import axios from "axios";

const URL = 'https://opentripmap-places-v1.p.rapidapi.com/en/places/bbox'


// aync function return a promise
export const getPalcesNearby = async(sw, ne)=>{
    try {
        const res = await axios.get(URL,{
          params: {
            lon_max: ne.lng,
            lat_min: sw.lat,
            lon_min: sw.lng,
            lat_max: ne.lat
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