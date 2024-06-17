import React, { useState } from 'react';

import { useServerMapOperationsStore } from 'store/store';

import favouriteImage from "../../assets/icons/Favourite.png"
import notFavouriteImage from "../../assets/icons/NotFavourite.png"

export default function LikeCounter({likeAmount, wasFavourite, idMap}) {
    const {
        addMapToFavourite,
        deleteMapFromFavourite,
    } = useServerMapOperationsStore();

    const [isFavourite, setIsFavourite] = useState(wasFavourite);
    const [actualLikeAmount, setActualLikeAmount] = useState(likeAmount);

    const switchFavouriteStatus = async () => {
        try {
            let newLikes = 0;
            if (!isFavourite) {
                newLikes = await addMapToFavourite(idMap);
            } else {
                newLikes = await deleteMapFromFavourite(idMap);
            }
            setActualLikeAmount(newLikes);
        } catch (e) {
            console.log(e);
        }

        setIsFavourite(!isFavourite);
    };

    return (
        <div className="flex-row-sb-c flex-gap-10 pointer" onClick={switchFavouriteStatus} title='Добавить в избранное'>
            <p>{actualLikeAmount}</p>
            <img src={isFavourite ? favouriteImage : notFavouriteImage} alt="Избранное" className="size-image-small"/>
        </div>
    );
}