// import React, { useEffect, useState } from 'react'
// import "./style.scss";
// import Img from '../../../components/lazyLoadImage/Img';

// const Upcoming = () => {
//   const[data,setdata]=useState()
//   useEffect(()=>{
//     fetch(`https://cors-anywhere.herokuapp.com/https://subsplease.org/api/?f=schedule&h=true&tz=Asia/Calcutta`)
//     .then(response => response.json())
//     .then(response => {
//       setdata(response)
//       console.log(response)
     
//     })
//     .catch(err => console.error(err));
  
//   },[])
//   return (
//     <div className='upcoming'>
//     <div className='schedule'>Schedule</div>
//     <div className='center'>

//     { data?.schedule.map((item) => {
//       let i=`https://subsplease.org/${item.image_url}`
// return(
//   <div className='ind' key={item.title}>
//   <img src={i}/>
//     <div className='title'>{item.title}</div>
//     <div className='time'>Time : {item.time}</div>
//   </div>
// )
//      })}
//     </div>
//     </div>
//   );
// };

// export default Upcoming;
