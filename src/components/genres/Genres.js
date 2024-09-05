import React from "react";


import "./style.scss";

const Genres = ({ data }) => {
    

    return (
        <div className="genres">
            {data?.map((g) => {
                {/* if (!genres[g]?.name) return; */}
                return (
                    <div key={g} className="genre">
                       {g}
                    </div>
                );
            })}
        </div>
    );
};

export default Genres;