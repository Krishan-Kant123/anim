import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
// import useFetch from "../../../hooks/useFetch";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import Img from "../../../components/lazyLoadImage/Img.js";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIcon } from "../PlayBtn";
import Eight from "../../../assets/eight.png"
// import VideoPopup from "../../../components/videoPopup/VideoPopup";

const DetailsBanner = ({ data }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const { mediaType, id } = useParams();
    // const { data, loading } = useFetch(`/${mediaType}/${id}`);

    // const { url } = useSelector((state) => state.home);

    const _genres = data?.genres?.map((g) => g);

    // const director = crew?.filter((f) => f.job === "Director");
    // const writer = crew?.filter(
    //     (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
    // );

    // const toHoursAndMinutes = (totalMinutes) => {
    //     const hours = Math.floor(totalMinutes / 60);
    //     const minutes = totalMinutes % 60;
    //     return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    // };
    // let start=`${data.startDate['year']}-${data.startDate['month']}-${data.startDate['day']}`;

    const navigate = useNavigate();
    const imge=data?.coverImage["extraLarge"]?data.coverImage['extraLarge']:data?.coverImage['medium'];

    return (
        <div className="detailsBanner">
            {data!=undefined ? (
                <>
                    { (
                        <React.Fragment>
                            <div className="backdrop-img">
                                <Img src={data.bannerImage} />
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {data.coverImage ? (
                                            <Img
                                                className="posterImg"
                                                src={
                                                   imge
                                                }
                                            />
                                        ) : (
                                            <Img
                                                className="posterImg"
                                                src={PosterFallback}
                                            />
                                        )}
                                        {/* {data.isAdult?(<img  className="adult" src={Eight}/>):(<></>)} */}
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {data?.title?.["english"]?data?.title["english"]:data?.title?.["romaji"]}
                                        </div>
                                        <div className="subtitle">
                                            {data.synonyms?.[0]}
                                        </div>

                                        <Genres data={_genres} />

                                        <div className="row">
                                            <CircleRating
                                                rating={(data.averageScore/10).toFixed(
                                                    1
                                                )}
                                            />
                                            <div
                                                className="playbtn"
                                                onClick={() => {
                                                    navigate(
                                            `/${data.type }/${
                                                data.id}/watch`
                                        )
                                                }}
                                            >
                                                <PlayIcon />
                                                <span className="text">
                                                    Watch Anime
                                                </span>
                                            </div>
                                        </div>

                                        <div className="overview">
                                            <div className="heading">
                                                Overview
                                            </div>
                                            <div className="description">
                                                {data?.description.replace( /(<([^>]+)>)/ig, '')}
                                            </div>
                                        </div>

                                        <div className="info">
                                            {data?.status && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Status:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {data?.status}
                                                    </span>
                                                </div>
                                            )}
                                            {data.startDate && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Release Date:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {dayjs(
                                                            `${data.startDate['year']}-${data.startDate['month']}-${data.startDate['day']}`
                                                        ).format("MMM D, YYYY")}
                                                    </span>
                                                </div>
                                            )}
                                            {data.endDate && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        End Date:{" "}
                                                    </span>
                                                    <span className="text">
                                                    {dayjs(
                                                            `${data.endDate['year']}-${data.endDate['month']}-${data.endDate['day']}`
                                                        ).format("MMM D, YYYY")}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {data.studios && (
                                            <div className="info">
                                                <span className="text bold">
                                                     Studios:{" "}
                                                </span>
                                                <span className="text">
                                                    {data.studios?.nodes.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {data.studios.nodes.length -
                                                                1 !==
                                                                i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
{/* 
                                        {writer?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Writer:{" "}
                                                </span>
                                                <span className="text">
                                                    {writer?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {writer.length -
                                                                1 !==
                                                                i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )} */}
{/* 
                                        {data?.created_by?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Creator:{" "}
                                                </span>
                                                <span className="text">
                                                    {data?.created_by?.map(
                                                        (d, i) => (
                                                            <span key={i}>
                                                                {d.name}
                                                                {data
                                                                    ?.created_by
                                                                    .length -
                                                                    1 !==
                                                                    i && ", "}
                                                            </span>
                                                        )
                                                    )}
                                                </span>
                                            </div>
                                        )} */}
                                    </div>
                                </div>
                            
                            </ContentWrapper>
                        </React.Fragment>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;