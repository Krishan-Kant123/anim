import React, { useState,useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { getTrending } from "../../../store/homeSlice";
// import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

// import useFetch from "../../../hooks/useFetch";


const Trending = () => {
    const dispatch = useDispatch();
    const { trending } = useSelector((state) => state.home);

    const [ data, setdata ] = useState()
//    const[loading,setloading]=useState()

const fetchtrend =()=>{
    if(trending[1]=="hii"){
        fetch('https://for-me-self.vercel.app/trending')
        .then(response => response.json())
        .then(response => {
            setdata(response)
            dispatch(getTrending(response))
            console.log(response)
        })
        .catch(err => console.error(err));
    }
    else{
        setdata(trending)
    }
}

useEffect(()=>{
fetchtrend()
},[])



// useEffect(()=>{
//     fetch('https://api.consumet.org/meta/anilist/trending?perPage=20')
//   .then(response => response.json())
//   .then(response => {
//       setdata(response)
//       console.log(response)
//   })
//   .catch(err => console.error(err));
// },[])

    // useEffect(()=>{
    //     fetch('https://march-api1.vercel.app/meta/anilist/trending?provider=gogoanime&perPage=20')
    //   .then(response => response.json())
    //   .then(response => {
    //       setdata(response)
    //       console.log(response)
    //   })
    //   .catch(err => console.error(err));
    // },[])

    // useEffect(()=>{
    //     setTimeout(()=>{setloading(1)},1800)
    // },[])

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Trending Airs...</span>
                {/* <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} /> */}
            </ContentWrapper>
            { <Carousel data={data?.results} 
            // loading={loading} 

            /> }
        </div>
    );
};

export default Trending;