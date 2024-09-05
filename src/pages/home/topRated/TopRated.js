import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { getLatest } from "../../../store/homeSlice";




const TopRated = () => {
    // const [endpoint, setEndpoint] = useState("movie");
    const dispatch = useDispatch();
    const { latest } = useSelector((state) => state.home);

   const[data,setdata]=useState()

   const fetchlatest =()=>{
    if(latest[1]=="hii"){
        fetch('https://for-me-self.vercel.app/trending/1/MOVIE')
        .then(response => response.json())
        .then(response => {
            setdata(response)
            dispatch(getLatest(response))
            console.log(response)
        })
        .catch(err => console.error(err));
    }
    else{
        setdata(latest)
    }
   }

   useEffect(()=>{
fetchlatest()
   },[])

//    useEffect(()=>{
//     fetch('https://api.consumet.org/meta/anilist/recent-episodes?provider=gogoanime&perPage=20')
//   .then(response => response.json())
//   .then(response => {
//       setdata(response)
//       console.log(response)
//   })
//   .catch(err => console.error(err));
// },[])

//    useEffect(()=>{
//     fetch('https://march-api1.vercel.app/meta/anilist/recent-episodes?provider=gogoanime&perPage=20')
//   .then(response => response.json())
//   .then(response => {
//       setdata(response)
//       console.log(response)
//   })
//   .catch(err => console.error(err));
// },[])

  
    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Top Movies...</span>
             
            </ContentWrapper>
            <Carousel
                data={data?.results}
              
            />
        </div>
    );
};

export default TopRated;