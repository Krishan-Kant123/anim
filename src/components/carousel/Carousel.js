import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";



import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";


import "./style.scss";

const Carousel = ({ data,title }) => {
    const carouselContainer = useRef();
   
    const navigate = useNavigate();

    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };

    return (
        <div className="carousel">
            <ContentWrapper>
                {title && <div className="carouselTitle">{title}</div>}
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
                {data!=undefined ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item,i) => {
                            if(item.type==="MANGA" || item.type==="ADAPTATION" || item.type=="NOVEL") return;
                            const posterUrl = item.coverImage.extraLarge
                                ? item.coverImage["extraLarge"]
                                : PosterFallback;
                            return (
                                <div
                                    key={i}
                                    className="carouselItem"
                                    onClick={() =>
                                        navigate(
                                            `/${item.type }/${
                                                item.id
                                            }`
                                        )
                                    }
                                >
                                    <div className="posterBlock">
                                        <Img src={posterUrl} />

                                        <CircleRating
                                            rating={(item.averageScore/10).toFixed(1)}
                                        />
                                        <Genres
                                            data={item.genres?.slice(0, 2)}
                                        />
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">
                                            {item.title['english'] || item.title['romaji']}
                                        </span>
                                      
                                        {item.episodes?(
                                            <span className="date">
                                            Episodes : {item.episodes}
                                            </span>
                                        ):(  item.episodeNumber && <span className="date">
                                            Episode No. : {item.episodeNumber}
                                            </span>)
                                            }
                                        
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Carousel;