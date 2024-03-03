import React from 'react';

import { Link } from 'react-router-dom';

import LikeCounter from '../sharedElements/likeCounter';

import userImage from "../../assets/icons/User.png";

export default function PublicMapCard() {
    return (
        <div className="flex-col-sb-c background-gray-search flex-gap-15 publicMapCard">
            <h3>Название карты</h3>

            <Link to="/maps/singleMap">
                <div className="mapCardPlaceholder"></div>
            </Link>
            
            <div className="flex-row-sb-c mapCardContent">
                <Link to="/maps/user">
                    <div className="flex-row-sb-c flex-gap-10">
                        <img src={userImage} alt="Аватар" className="size-image-small"/>
                        <p>Пользователь</p>
                    </div>
                </Link>

                <LikeCounter likeAmount="34634" wasFavourite={false} />
            </div>
        </div>
    );
}