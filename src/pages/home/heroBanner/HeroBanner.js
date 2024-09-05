import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./style.scss";


// import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    // https://pic.re/image

    // useEffect(()=>{
   
    
    //     const url = 'https://cors-proxy3.p.rapidapi.com/api';
    //     const options = {
    //         method: 'POST',
    //         headers: {
    //             'content-type': 'application/x-www-form-urlencoded',
    //             'X-RapidAPI-Key': 'dc6fe621c5msh7d8823d68edd642p140009jsn8d6a15fd5dd6',
    //             'X-RapidAPI-Host': 'cors-proxy3.p.rapidapi.com'
    //         },
    //         body: new URLSearchParams({
    //             'my-url': 'https://harrynull.tech/api/wallpapers/random_anime_wallpaper?download=true'
    //         })
    //     };
        
    //     fetch(url, options)
    //     .then(res => res.json())
    //     .then(res => {
    //         setBackground(res.img_src)
    //         console.log(res)})
    //     .catch(err => console.log(err))
    //  
          
    //   },[])
    // useEffect(()=>{
        
    //     fetch('https://cors-anywhere.herokuapp.com/https://harrynull.tech/api/wallpapers/random_anime_wallpaper?download=true')
    //     .then(res => res.json())
    //     .then(res => {
    //         setBackground(res.img_src)
    //         console.log(res)})
    //     .catch(err => console.log(err))
    // },[])


       
   
      useEffect(()=>{
        
        fetch('https://for-me-self.vercel.app/')
        .then(res => res.json())
        .then(res => {
            if(res.img_src=="https://i.redd.it/iuq323a6nfza1.jpg" || res.img_src=="https://i.redd.it/xw0v346de8p91.jpg"){
                setBackground("https://i.imgur.com/cHOmkzs.jpeg")
            }
            else{

                setBackground(res.img_src)
            }
            console.log(res)})
        .catch(err => console.log(err))
    },[])

    // useEffect(()=>{
        
    //     fetch(' https://mint-1-k0992154.deta.app')
    //     .then(res => res.json())
    //     .then(res => {
    //         setBackground(res.img_src)
    //         console.log(res)})
    //     .catch(err => console.log(err))
    // },[])

  



    //   let i=`https://harrynull.tech${background}`;
    //   console.log(i)
  

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    let b='';
    const z=()=>{
 
       b=query;
       if(b.length > 0){
           navigate(`/search/${b}`);
      }
    }

    return (
        <div className="heroBanner">
            {(
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}

            <div className="opacity-layer"></div>
            <ContentWrapper>

                <div className="heroBannerContent">
                    <span className="title">Welcome.</span>
                    <span className="subTitle">
                        Millions of movies, Anime shows and Characters to discover.
                        Explore now.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie or anime...."
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button onClick={z}>Search</button>
                    </div>
                </div>
            
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
