import React from 'react';

import userImage from "../../assets/icons/User.png";
import LikeCounter from './likeCounter';

function PublicMapCard() {
    return (
        <div className="flex-col-sb-c background-gray-search flex-gap-15 publicMapCard">
            <h2>Название карты</h2>
            <div className="mapCardPlaceholder"></div>
            <div className="flex-row-sb-c mapCardContent">
                <div className="flex-row-sb-c flex-gap-10">
                    <img src={userImage} alt="Аватар" className="size-image-small"/>
                    <p>Пользователь</p>
                </div>

                <LikeCounter likeAmount="34634" wasFavourite={true} />
            </div>
        </div>
    );
}

export default PublicMapCard;