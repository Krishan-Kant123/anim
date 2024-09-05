import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";

const CircleRating = ({ rating }) => {
    if(rating===undefined || rating===null || rating==0){
        // rating=0.0
        rating="NA";
       
    }

    return (
        <div className="circleRating">
            <CircularProgressbar
                value={rating=="NA"?0.2:rating}
                maxValue={10}
                text={rating}
                styles={buildStyles({
                    pathColor:
                        rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                })}
            />
        </div>
    );
};

export default CircleRating;