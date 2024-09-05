import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { getOngoing } from "../../../store/homeSlice";




const Ongoing = () => {
    // const [endpoint, setEndpoint] = useState("movie");
    const dispatch = useDispatch();
    const { ongoing } = useSelector((state) => state.home);

   const[data,setdata]=useState()

   const fetchlatest =()=>{
    if(ongoing[1]=="hii"){
        fetch('https://for-me-self.vercel.app/ongoing/1')
        .then(response => response.json())
        .then(response => {
            setdata(response)
            dispatch(getOngoing(response))
            console.log(response)
        })
        .catch(err => console.error(err));
    }
    else{
        setdata(ongoing)
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
                <span className="carouselTitle">Ongoings...</span>
             
            </ContentWrapper>
            <Carousel
                data={data?.results}
              
            />
        </div>
    );
};

export default Ongoing;