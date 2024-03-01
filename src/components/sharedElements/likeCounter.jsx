import React, { useState } from 'react';

import favouriteImage from "../../assets/icons/Favourite.png"
import notFavouriteImage from "../../assets/icons/NotFavourite.png"

export default function LikeCounter({likeAmount, wasFavourite}) {
    const [isFavourite, setIsFavourite] = useState(wasFavourite);

    const switchToFavourite = () => {
        setIsFavourite(!isFavourite);
    };

    return (
        <div className="flex-row-sb-c flex-gap-10" onClick={switchToFavourite}>
            <p>{likeAmount}</p>
            <img src={isFavourite ? favouriteImage : notFavouriteImage} alt="Избранное" className="size-image-small"/>
        </div>
    );
}