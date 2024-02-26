import React from 'react';

import { useState } from "react";

import userImage from "../assets/icons/User.png";
import favouriteImage from "../assets/icons/Favourite.png";
import notFavouriteImage from "../assets/icons/NotFavourite.png";

function PublicMapCard() {
    const [isFavourite, setIsFavourite] = useState(false);

    const switchToFavourite = () => {
        setIsFavourite(!isFavourite);
    };

    return (
        <div className="flex-col-sb-c background-gray-search flex-gap-15 publicMapCard">
            <h2>Название карты</h2>
            <div className="mapCardPlaceholder"></div>
            <div className="flex-row-sb-c mapCardContent">
                <div className="flex-row-sb-c flex-gap-10">
                    <img src={userImage} alt="Аватар" className="size-image-small"/>
                    <p>Пользователь</p>
                </div>

                <div className="flex-row-sb-c flex-gap-10" onClick={switchToFavourite}>
                    <p>34634</p>
                    <img src={isFavourite ? favouriteImage : notFavouriteImage} alt="Избранное" className="size-image-small"/>
                </div>
            </div>
        </div>
    );
}

export default PublicMapCard;