import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const Img = ({ src, className }) => {
    return (
        <LazyLoadImage
            className={className || ""}
            alt="https://i.imgur.com/cHOmkzs.jpeg"
            effect="blur"
            src={src}
        />
    );
};

export default Img;