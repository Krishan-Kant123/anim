
import { useState,useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import Episodes from "./pages/episodes/Episodes";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound.js";
import VideoPlayer from './components/player/Player';



function App() {

    const dispatch = useDispatch();
    const { url } = useSelector((state) => state.home);


    // useEffect(() => {
    //     fetchApiConfig();
    //     // genresCall();
    // }, []);

    // const fetchApiConfig = () => {
    //     fetchDataFromApi("/trending").then((res) => {
    //         console.log(res);

    //         // const url = {
    //         //     backdrop: res.images.secure_base_url + "original",
    //         //     poster: res.images.secure_base_url + "original",
    //         //     profile: res.images.secure_base_url + "original",
    //         // };

    //         // dispatch(getApiConfiguration(url));
    //     });
    // };

  return (
      // <VideoPlayer/>
       <BrowserRouter>
          <Header />
          <Routes>
       
          
              <Route path="/" element={<Home />} />
              <Route path="/:mediaType/:id" element={<Details />} />
              <Route path="/:mediaType/:id/watch" element={<Episodes />} />
              <Route path="/search/:query" element={<SearchResult />} />
              <Route path="/explore/:mediaType" element={<Explore />} />
              <Route path="*" element={<PageNotFound />} />

          </Routes>
          <Footer />
      </BrowserRouter> 
  )
}

export default App
