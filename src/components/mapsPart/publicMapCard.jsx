import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import { useServerMapOperationsStore } from 'store/store';
import LikeCounter from '../sharedElements/likeCounter';

import userImage from "../../assets/icons/User.png";


export default function PublicMapCard({ id, name, id_creator, creator_name, number_in_favourites }) {
    const navigate = useNavigate();

    const {
        urlToGetPreviewImg,
    } = useServerMapOperationsStore();

    const handleUserClick = () => {
        Cookies.set('idUser', id_creator, { expires: 30 });
    }

    const handleViewMap = () => {
        Cookies.set('idViewingMap', id, { expires: 30 });
    };

    return (
        <div className="flex-col-sb-c background-gray-search flex-gap-15 publicMapCard">
            <h3>{name}</h3>

            <Link to="/maps/singleMap" onClick={() => handleViewMap()}>
                <img src={urlToGetPreviewImg + id + '.jpg'} className="mapCardImg" alt={name} />
            </Link>
            
            <div className="flex-row-sb-c mapCardContent">
                <Link to="/maps/user" onClick={() => handleUserClick()}>
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