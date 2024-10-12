import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

// import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
// import VideosSection from "./videosSection/VideosSection";
import Similar from "./carousels/Similar";

import Recommendation from "./carousels/Recommendation";
import { useSelector, useDispatch } from "react-redux";
import { getData,getdubData, getApiConfiguration } from "../../store/homeSlice";


const Details = () => {
    const { mediaType, id } = useParams();
  const[data,setdata]=useState()
  const[dub,setdub]=useState(false)

  const[dubdata,setdubdata]=useState()
  // let i=0;
  // i=parseInt(id);
  const dispatch=useDispatch()
 
  useEffect(()=>{
    setdata()

    fetch(`https://random-plum-tau.vercel.app/detail/${id}/${dub}`)
    .then(response => response.json())
    .then(response => {
      setdata(response.data.Media)
      console.log(response)
      dispatch(getData(response.data.Media));
    })
    .catch(err => console.error(err));

    fetch(`https://random-plum-tau.vercel.app/detail/${id}/${true}`)
    .then(response => response.json())
    .then(response => {
      setdubdata(response.data.Media)
      console.log(response)
      dispatch(getdubData(response.data.Media));
    })
    .catch(err => console.error(err));




},[id,dub])

//   useEffect(()=>{
    

//       fetch(`https://march-api1.vercel.app/meta/anilist/info/${id}?fetchFiller=true&dub=${dub}&provider=gogoanime`)
//       .then(response => response.json())
//       .then(response => {
//         setdata(response)
//         console.log(response)
//       })
//       .catch(err => console.error(err));
 
// },[id,dub])


    return (
        <div>
            <DetailsBanner data={data}  />
            <Cast data={data}  />
            {/* <VideosSection data={data} loading={loading} /> */}
            <Recommendation data={data}/> 
            <Similar data={data}/>
           
        </div>
    );
};

export default Details;