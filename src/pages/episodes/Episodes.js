import React from 'react'
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cast from '../details/cast/Cast';
import Recommendation from '../details/carousels/Recommendation';

import EpisodeList from "./episodeList/EpisodeList"
const Episodes = () => {
    const { mediaType, id} = useParams();
    const {data}=useSelector((state) => state.home);
    const {dubdata}=useSelector((state) => state.home);
    console.log(data)
    console.log(dubdata)
    return(
    <div>
    <EpisodeList data={data} dubdata={dubdata}/>
    <Cast data={data}  />
    <Recommendation data={data}/> 
    </div>
  )
}

export default Episodes;
