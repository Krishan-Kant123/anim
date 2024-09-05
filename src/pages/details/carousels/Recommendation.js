import React from "react";
import "./style.scss"
import Carousel from "../../../components/carousel/Carousel";
import MovieCard from "../../../components/movieCard/MovieCard";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
// import useFetch from "../../../hooks/useFetch";

const Recommendation = ({ data}) => {
    // const { data, loading, error } = useFetch(
    //     `/${mediaType}/${id}/recommendations`
    // );

    return (
        <div className="recomm">
      <ContentWrapper>
    <div className="carouselTitle">Recommendations</div>
    <div className="content">
    {data?.recommendations?.map((item,i)=>{
        return(

            <MovieCard
          key={i}
          data={item}
          
      />
        )
    })
    }

    </div>

        </ContentWrapper>
        </div>
    );
};

export default Recommendation;

// <>
// <div className="carouselTitle">Recommendations</div>
//         <MovieCard
//             title="Recommendations"
//             data={data?.recommendations}
            
//         />
//         </>