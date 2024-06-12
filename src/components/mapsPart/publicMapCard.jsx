import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useServerMapOperationsStore } from 'store/store';
import LikeCounter from '../sharedElements/likeCounter';

import userImage from "../../assets/icons/User.png";


export default function PublicMapCard({ id, name, id_creator, creator_name, number_in_favourites }) {
    const navigate = useNavigate();

    const {
        urlToGetPreviewImg,
    } = useServerMapOperationsStore();

    const handleUserClick = () => {
        navigate(`/maps/user/${id_creator}`);
    }

    const handleViewMap = () => {
        navigate(`/maps/singleMap/${id}/${id_creator}`);
    };

    return (
        <div className="flex-col-sb-c background-gray-search flex-gap-15 publicMapCard">
            <h3>{name}</h3>

            <img src={urlToGetPreviewImg + id + '.jpg'} className="mapCardImg pointer" alt={name} onClick={() => handleViewMap()}/>
            
            <div className="flex-row-sb-c mapCardContent">
                <div className="flex-row-sb-c flex-gap-10 pointer" onClick={() => handleUserClick()}>
                    <img src={userImage} alt="Аватар" className="size-image-small"/>
                    <p>{creator_name}</p>
                </div>

                <LikeCounter likeAmount={number_in_favourites} wasFavourite={false} />
            </div>
        </div>
    );
}