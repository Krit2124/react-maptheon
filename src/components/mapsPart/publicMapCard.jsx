import React from 'react';
import { Link } from 'react-router-dom';

import { useServerMapOperationsStore } from 'store/store';
import LikeCounter from '../sharedElements/likeCounter';

import userImage from "../../assets/icons/User.png";


export default function PublicMapCard({ id, name, id_creator, creator_name, number_in_favourites }) {
    const {
        urlToGetPreviewImg,
    } = useServerMapOperationsStore();

    return (
        <div className="flex-col-sb-c background-gray-search flex-gap-15 publicMapCard">
            <h3>{name}</h3>

            <Link to="/maps/singleMap">
                <img src={urlToGetPreviewImg + id + '.jpg'} className="mapCardImg" alt={name} />
            </Link>
            
            <div className="flex-row-sb-c mapCardContent">
                <Link to="/maps/user">
                    <div className="flex-row-sb-c flex-gap-10">
                        <img src={userImage} alt="Аватар" className="size-image-small"/>
                        <p>{creator_name}</p>
                    </div>
                </Link>

                <LikeCounter likeAmount={number_in_favourites} wasFavourite={false} />
            </div>
        </div>
    );
}