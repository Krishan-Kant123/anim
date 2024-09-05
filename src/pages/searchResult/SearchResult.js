import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

// import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";

const SearchResult = () => {
    const [data, setData] = useState(null);
    const[next,setnext]=useState(false)
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();
  
    const fetchInitialData = () => {
        setLoading(true);
        fetch(`https://for-me-self.vercel.app/search/${query}/${pageNum}`)
        .then(res => res.json())
            .then(res=>{
                setData(res.results);
                setnext(res.hasNextPage)
                console.log(res)
                setPageNum((prev) => prev + 1);
                setLoading(false);
            }
        )
        .catch(err => console.log(err));
    };

    const fetchNextPageData = () => {
        if(next){

            fetch(`https://for-me-self.vercel.app/search/${query}/${pageNum}`)
            .then(res => res.json())
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
        setPageNum(1);
        fetchInitialData();
    }, [query]);

    return (
        <div className="searchResultsPage">
            {loading && <Spinner initial={true} />}
            {!loading && (
                <ContentWrapper>
                    {data? (
                        <>
                            <div className="pageTitle">
                                {`Search ${
                                    data?.results > 1
                                        ? "results"
                                        : "result"
                                } of '${query}'`}
                            </div>
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.length || []}
                                next={fetchNextPageData}
                                hasMore={next?pageNum:next
                                }
                                loader={<Spinner />}
                            >
                                {data?.map((item, index) => {
                                    {/* if (item.media_type === "person") return; */}
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            fromSearch={true}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <div className="resultNotFound">
                        <div className="nores">
                            <img src={noResults}/>
                        </div>
                            Sorry, Results not found!
                        </div>
                    )}
                </ContentWrapper>
            )}
        </div>
    );
};

export default SearchResult;
