import React, { useState,useEffect } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { useSelector, useDispatch } from "react-redux";
import { getPopular } from "../../../store/homeSlice";




const Popular = () => {
    const dispatch = useDispatch();
    const { popular } = useSelector((state) => state.home);
    const[data,setdata]=useState({});
    // console.log(data)
    // console.log(popular[1])
   

    const fetchpop =()=>{
        setTimeout(()=>{
            if(popular[1]=="hii"){
                fetch('https://for-me-self.vercel.app/popular/1')
                .then(response => response.json())
                .then(response => {
                    setdata(response)
                    dispatch(getPopular(response));
                    console.log(response)
                })
                .catch(err => console.error(err));
            }
            else{
                setdata(popular);
            }
        },1000)
     
    }

    useEffect(()=>{
      fetchpop()
    },[])

    // useEffect(()=>{
    //     fetch('https://api.consumet.org/meta/anilist/advanced-search')
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
                <span className="carouselTitle">What's Popular</span>
             
            </ContentWrapper>
            <Carousel
                data={data?.results}
                // loading={loading}
               
            />
        </div>
    );
};

export default Popular;