import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Img from "../../../components/lazyLoadImage/Img";
import avatar from "../../../assets/avatar.png";

const Cast = ({data}) => {
   

    const skeleton = () => {
        return (
            <div className="skItem">
                <div className="circle skeleton"></div>
                <div className="row skeleton"></div>
                <div className="row2 skeleton"></div>
            </div>
        );
        let i=0;
    };
    return (
        <div className="castSection">
            <ContentWrapper>
                <div className="sectionHeading">Voice Actors</div>
                {data!=undefined ? (
                    <div className="listItems">
                        {data.characterPreview?.edges?.map((item) => {
                            let imgUrl = item.voiceActors[0]?.image?.large
                                ? item.voiceActors[0]?.image?.large
                                : avatar;
                            return (
                                <div key={item.id} className="listItem">
                                    <div className="profileImg">
                                        <Img src={imgUrl} />
                                    </div>
                                    <div className="name">{item.voiceActors[0]?.name.userPreferred}</div>
                                    <div className="character">
                                        {item.node.name.userPreferred } ({item.role})
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="castSkeleton">
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                        {skeleton()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Cast;