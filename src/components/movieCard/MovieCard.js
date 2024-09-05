import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";


import "./style.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";

const MovieCard = ({ data, fromSearch}) => {
  
    const navigate = useNavigate();
    const posterUrl = data.image
    ? data.image
    : PosterFallback;
    return (
        <div
            className="movieCard"
            onClick={() =>
                navigate(`/${data.type }/${data.id}`)
            }
        >
            <div className="posterBlock">
                <Img className="posterImg" src={posterUrl} />
                { (
                    <React.Fragment>
                        <CircleRating rating={(data.rating/10).toFixed(1)} />
                        <Genres data={data?.genres?.slice(0, 2)} />
                    </React.Fragment>
                )}
            </div>
            <div className="textBlock">
                <span className="title">{data?.title["english"]?data?.title["english"]:data?.title["romaji"] }</span>
                <span className="date">
                Episodes : {data?.totalEpisodes?data.totalEpisodes:data.episodes}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;