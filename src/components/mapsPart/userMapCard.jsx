import React from 'react';

import { Link } from 'react-router-dom';

import LikeCounter from '../sharedElements/likeCounter';


export default function UserMapCard() {
    return (
        <div className="flex-col-sb-c background-gray-search flex-gap-15 personalMapCard">
            <Link to="/maps/singleMap">
                <div className="mapCardPlaceholder"></div>
            </Link>
            <div className="flex-row-sb-c mapCardContent">
                <h3>Название карты</h3>
                
                <LikeCounter likeAmount="34634" wasFavourite={false} />
            </div>
        </div>
    );
}