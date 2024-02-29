import React from 'react';
import LikeCounter from './likeCounter';

function UserMapCard() {
    return (
        <div className="flex-col-sb-c background-gray-search flex-gap-15 personalMapCard">
            <div className="mapCardPlaceholder"></div>
            <div className="flex-row-sb-c mapCardContent">
                <h2>Название карты</h2>
                
                <LikeCounter likeAmount="34634" wasFavourite={false} />
            </div>
        </div>
    );
}

export default UserMapCard;