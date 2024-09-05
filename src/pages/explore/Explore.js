import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";

import "./style.scss";

// import useFetch from "../../hooks/useFetch";
// import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";

let filters = {};

const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
        value: "primary_release_date.desc",
        label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];

const Explore = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState(null);
    const [sortby, setSortby] = useState(null);
    const { mediaType } = useParams();
    const[next,setnext]=useState(false)

    // const { data: genresData } = useFetch(`/genre/${mediaType}/list`);

    const fetchInitialData = () => {
        setLoading(true);
        if(mediaType==="popular"){

            fetch(
                `https://for-me-self.vercel.app/popular/${pageNum}`,
          filters
      ).then(res => res.json()).then((res) => {
        setData(res.results);
        setnext(res.hasNextPage)
        console.log(res)
        setPageNum((prev) => prev + 1);
        setLoading(false);
    });
     }
     else{
        
        fetch(
            `https://for-me-self.vercel.app/trending/${pageNum}/TV `,
      filters
  ).then(res => res.json()).then((res) => {
    setData(res.results);
    setnext(res.hasNextPage)
    console.log(res)
    setPageNum((prev) => prev + 1);
    setLoading(false);
});
     }
    };

    const fetchNextPageData = () => {
        if(mediaType==="popular"){

            fetch(
                `https://for-me-self.vercel.app/popular/${pageNum}`,
            filters
        ).then(res => res.json())
        .then(res => {
            // if (data?.length>0) {
            //     setData(
            //         {...data,...res?.results}
            //     );
            //     console.log(res)
            //     setnext(res.hasNextPage)
            // } else {
                //     setData(res.results);
                // }
                
                setData([...data,...res.results]);
                    console.log([...data,...res.results])
                    setnext(res.hasNextPage)
                    
                    setPageNum((prev) => prev + 1);
                }
                )
                .catch(err => console.log(err));
            }
            else{
                
            fetch(
                `https://for-me-self.vercel.app/trending/${pageNum}/TV`,
            filters
        ).then(res => res.json())
        .then(res => {
            // if (data?.length>0) {
            //     setData(
            //         {...data,...res?.results}
            //     );
            //     console.log(res)
            //     setnext(res.hasNextPage)
            // } else {
                //     setData(res.results);
                // }
                
                setData([...data,...res.results]);
                    console.log([...data,...res.results])
                    setnext(res.hasNextPage)
                    
                    setPageNum((prev) => prev + 1);
                }
                )
                .catch(err => console.log(err));
            }
            };
    

    useEffect(() => {
        filters = {};
        setData(null);
        setPageNum(1);
        setSortby(null);
        setGenre(null);
        fetchInitialData();
    }, [mediaType]);

    const onChange = (selectedItems, action) => {
        if (action.name === "sortby") {
            setSortby(selectedItems);
            if (action.action !== "clear") {
                filters.sort_by = selectedItems.value;
            } else {
                delete filters.sort_by;
            }
        }

        if (action.name === "genres") {
            setGenre(selectedItems);
            if (action.action !== "clear") {
                let genreId = selectedItems.map((g) => g.id);
                genreId = JSON.stringify(genreId).slice(1, -1);
                filters.with_genres = genreId;
            } else {
                delete filters.with_genres;
            }
        }

        setPageNum(1);
        fetchInitialData();
    };

    return (
        <div className="explorePage">
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">
                        {mediaType === "trending"
                            ? "Explore Trendings"
                            : "Explore Popular"}
                    </div>
                    {/* <div className="filters">
                        <Select
                            isMulti
                            name="genres"
                            value={genre}
                            closeMenuOnSelect={false}
                            // options={genresData?.genres}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => option.id}
                            onChange={onChange}
                            placeholder="Select genres"
                            className="react-select-container genresDD"
                            classNamePrefix="react-select"
                        />
                        <Select
                            name="sortby"
                            value={sortby}
                            options={sortbyData}
                            onChange={onChange}
                            isClearable={true}
                            placeholder="Sort by"
                            className="react-select-container sortbyDD"
                            classNamePrefix="react-select"
                        />
                    </div> */}
                </div>
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <>
                        {data?.length > 0 ? (
                            /* <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={next?pageNum:next
                                }
                                loader={<Spinner />}
                            > */
                            <>
                            <div className="content">
                                {data?.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            mediaType={mediaType}
                                        />
                                    );
                                })}
                                </div>
                                <div className="btn" onClick={fetchNextPageData}>{next?"Next ":"No More"}</div>
                                </>
                            /* </InfiniteScroll> */
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Results not found!
                            </span>
                        )}
                    </>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Explore;