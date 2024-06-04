import React from 'react';

import { Link } from 'react-router-dom';
import { useServerMapOperationsStore } from 'store/store';

import LikeCounter from '../sharedElements/likeCounter';
import Cookies from 'js-cookie';

export default function UserMapCard({ id, name, number_in_favourites }) {
    const {
        urlToGetPreviewImg,
    } = useServerMapOperationsStore();

    const handleViewMap = () => {
        Cookies.set('idViewingMap', id, { expires: 30 });
    };

    return (
        <div className="flex-col-sb-c background-gray-search flex-gap-15 personalMapCard">
            <Link to="/maps/singleMap" onClick={() => handleViewMap()}>
                <img src={urlToGetPreviewImg + id + '.jpg'} className="mapCardImg" alt={name} />
            </Link>
            <div className="flex-row-sb-c mapCardContent">
                <h3>{name}</h3>
                
                <LikeCounter likeAmount={number_in_favourites} wasFavourite={false} />
            </div>
        </div>
    );
}