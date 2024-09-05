import React, { useState,useEffect } from 'react'
import Img from '../../../components/lazyLoadImage/Img'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import { useSelector, useDispatch } from "react-redux";
import "./style.scss";
import { useParams } from "react-router-dom";

import VideoPlayer from "../../../components/player/Player"




const EpisodeList = ({data,dubdata}) => {
  const { mediaType, id } = useParams();
  const[name,setname]=useState("")
  const[link,setlink]=useState("")
  
  const[m,setm]=useState("")


  const g=(str,p,no,i)=>{  
    setep(no)


  fetch(`https://for-me-self.vercel.app/watch/${str}`)
  .then(res => res.json())
  .then(res => {
 
    setm(res.sources)
      // console.log(m)
    console.log(m)
    // setlink(res.sources)
    setname(res.sources)



   
  })
  .catch(err => console.log(err))


    }
  



    const[la,setla]=useState(data)
  
  const individual=document.querySelectorAll(".individual");
  individual.forEach(it =>{
    it.addEventListener("click",() =>{
   
      document.querySelector(".active")?.classList.remove("active");
      it.classList.add("active");
    })
  })
  useEffect(()=>{
    individual.forEach(it =>{
      it.addEventListener("click",() =>{
     
        it.classList.add("active");
      })
    })
  },[])

  const btn=document.querySelectorAll(".btn");
  btn.forEach(ik => {
  ik.addEventListener("click",() =>{
    document.querySelector(".btnact")?.classList.remove("btnact");
    ik.classList.add("btnact");
  })
  })
  useEffect(()=>{
    document.querySelector(".btnact")?.classList.remove("btnact");

    document.querySelector(".sub")?.classList.add("btnact")
  },[])


 
  const[ep,setep]=useState()
  let b="";
  const f = (str,p,no,i)=>{
    // if(document.querySelector(".active")){

    //   document.querySelectorAll(".individual").classList.remove("active")
    // }
    document.querySelectorAll(".individual")[i].classList.add("active")
    setep(no)
  if(p=="sub"){

    // b=`https://animeflix.live/watch/${str}/`;
    // setname(b)
    console.log(b)
  }
  else if(p=="dub"){
    // str=str.slice(0,str.indexOf("-episode"))+"-dub"+str.slice(str.indexOf("-episode"),str.length);
    // b=`https://animeflix.live/watch/${str}/`;
    // setname(b)
    setlang("dub")
    
    console.log(b)
  }
    //  setname(b)
  }
  const[lang,setlang]=useState("sub")
  let l="sub";


  const lan=(v)=>{
    if(v=="dub"){ setla(dubdata);
  
    }
    else{
  setla(data);
}
setlang(v);

    // btn.forEach(ik => {
    //   ik.addEventListener('click',()=>{

    //     document.querySelector(".btnact").classList.remove("btnact");
    //     ik.classList.add("btnact");
    //   })
    //   // const btn=document.querySelectorAll(".btn");
    // })
    


  //   fetch(`https://for-me-self.vercel.app/detail/${id}/${v}`)
  //   .then(response => response.json())
  //   .then(response => {
  //     // setdata(response)
  //     console.log(response)
    
  //   })
  //   .catch(err => console.error(err));
  // }

  // useEffect(()=>{
  //   try{
  //     function tr(){
  //       return document.fullscreenElement
  //           || document.webkitFullscreenElement
  //     }
  
  //     let fs=document.getElementById('fs');
  //     fs.addEventListener('click',()=>{
  //       if(tr()){
  //         document.exitFullscreen()
  //       }
  //       else{
  
  //         document.getElementById("scr").requestFullscreen().catch(console.log)
  //       }
  //     })
  //   }
  //     catch(err){}
  }

  return (
    <div className="episodeList">
    <div className='title'>{data?.type} * {data?.title["english"]?data?.title["english"]:data?.title["romaji"]}</div>
      <div className="backdrop-img">
            <Img src={data.cover} />
      </div>
      <div className="opacity-layer"></div>
  <div className='flex'>

        <div className='episodeno'>
        {/* <div className='scrolfor'> */}
<div className='eplength'>Episodes : {la?.episodes.length}</div>
            {la?.episodes?(
                la?.episodes.map((item,i)=>{
                    return(
                        <>
<div className='individual' key={i} onClick={()=>{g(item.id,la,item.number,i)}}>
<div className='im'>

<img src={item.image} className="imgeep"/>
</div>
<div className='titleep'>

    <span className='epno'>{item.number}&nbsp;</span>
    <span className='eptitle'>: {item.title?item.title:item.description}</span>
</div>
</div>

                        </>

                    );
                })
            ):(
<div></div>
            )}
           
        {/* </div> */}
        </div>
        <div className='strlan'>

        <div className='streamdis' id='scr'>
        { m===""?(
          <div className='fake'>Tap to watch...</div>
        ):(<>
          <div className='hideback'></div>
          {/* <div className='togglefs' id='fs'></div> 
          <iframe className='stream'  src={name} title="" referrerpolicy="no-referrer-when-downgrade" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe> */}
       <div id="vid" className='stream'>
       <VideoPlayer fet={name}/>

   


       </div>
         
       {/* <video  id="my-video"
    className="video-js stream"
    controls
    preload="auto"
    data-setup="{}">
   
  
    <source src="https://www119.vipanicdn.net/streamhls/8bc7e56bf518ad8e1a42e82c0ce51e1d/ep.3.1709319505.1080.m3u8" type="application/x-mpegURL" />

   
     </video> */}
        </>
)}
        </div>
        <div className='under'>

        <div className='ep'>Current Episode : {ep} ({lang})</div>
        <div className='lang'>
<span className='btn sub btnact' onClick={()=>{lan("sub")}}>SUB</span>
<span className='btn dub' onClick={()=>{lan("dub")}}>DUB</span>
        </div>
        </div>
        </div>
  </div>
    </div>
  )
        }
      
      

export default EpisodeList;
