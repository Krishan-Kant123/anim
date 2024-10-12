import React from "react";

import Carousel from "../../../components/carousel/Carousel";
// import useFetch from "../../../hooks/useFetch";

const Similar = ({data}) => {
    // const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`);

    // const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies";

    return (
        <>

      
        <Carousel
            title="Related"
            data={data?.relations?.nodes}
          
        />
        </>
    );
};

export default Similar;
