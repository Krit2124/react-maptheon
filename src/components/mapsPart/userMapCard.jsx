import React from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { useServerMapOperationsStore } from 'store/store';

import LikeCounter from '../sharedElements/likeCounter';

export default function UserMapCard({ id, name, number_in_favourites, wasFavourite }) {
    const navigate = useNavigate();
    const { id_user } = useParams();

    const {
        urlToGetPreviewImg,
    } = useServerMapOperationsStore();

    const handleViewMap = () => {
        navigate(`/maps/singleMap/${id}/${id_user}`);
    };

    return (
        <div className="flex-col-sb-c background-gray-search flex-gap-15 personalMapCard">
            <img src={urlToGetPreviewImg + id + '.jpg'} className="mapCardImg pointer" alt={name} onClick={() => handleViewMap()} title='Просмотр карты' />
            
            <div className="flex-row-sb-c mapCardContent">
                <h3>{name}</h3>
                
                <LikeCounter likeAmount={number_in_favourites} wasFavourite={wasFavourite} idMap={id} />
            </div>
        </div>
    );
}