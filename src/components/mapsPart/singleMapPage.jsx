import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { useServerMapOperationsStore, useServerTagOperationsStore } from 'store/store';
import LikeCounter from '../sharedElements/likeCounter';

export default function SingleMapPage() {
    const navigate = useNavigate();
    const { id_map, id_user } = useParams();

    const { 
        urlToGetFullSizeImg,
        userMapInfo,
    } = useServerMapOperationsStore();

    const { 
        tagsForMap,
    } = useServerTagOperationsStore();

    const [mapName, setMapName] = useState('Название карты');
    const [likeAmount, setLikeAmount] = useState(0);
    const [mapDescription, setMapDescription] = useState('Описание карты');
    const [createdAt, setCreatedAt] = useState('2024-05-14 15:55:48');
    const [updatedAt, setUpdatedAt] = useState('2024-05-14 15:55:48');

    const [creatorName, setCreatorName] = useState('Имя пользователя');

    const [tags, setTags] = useState([]);

    const fetchMapSettings = async () => {
        try {
            const mapSettings = await userMapInfo(id_map, id_user);
            setMapName(mapSettings.name);
            setMapDescription(mapSettings.description);
            setLikeAmount(mapSettings.number_in_favourites);
            setCreatedAt(mapSettings.createdAt);
            setUpdatedAt(mapSettings.updatedAt);
            setCreatorName(mapSettings.creator_name);
        } catch (e) {
            console.log(e);
        }
    };

    const fetchTags = async () => {
        try {
            const newTags = await tagsForMap(id_map);
            setTags(newTags);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchMapSettings();
        fetchTags();
    }, [])

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString().slice(0, 10);
    };

    return (
        <section className="background-gray-default size-full-vertical-pagePercent-withHeader flex-col-c-c flex-gap-20">
            <div className="container-fullScreen flex-row-c-c flex-gap-50">
                <div className="mapFillSizeImage size-full-vertical-percent">
                    <img src={urlToGetFullSizeImg + id_map + '.jpg'} alt="Карта" />
                </div>

                <div className='flex-col-sb-left flex-gap-30 container-mapInfo'>
                    <div className='flex-row-c-c size-full-horizontal-percent' title='Просмотр профиля пользователя'>
                        <h1 onClick={() => navigate(`/maps/user/${id_user}`)} className='pointer'>{creatorName}</h1>
                    </div>

                    <div className='flex-row-sb-c size-full-horizontal-percent'>
                        <h1>{mapName}</h1>

                        <LikeCounter likeAmount={likeAmount} wasFavourite={false} />
                    </div>

                    <div className='size-full-horizontal-percent'>
                        <p>{mapDescription}</p>
                    </div>

                    <div className='flex-col-sb-left flex-gap-10 size-full-horizontal-percent'>
                        <p>Дата создания: {formatDate(createdAt)}</p>
                        <p>Дата обновления: {formatDate(updatedAt)}</p>
                    </div>

                    <div className='flex-row-sb-c size-full-horizontal-percent flex-gap-10'>
                        <a href={urlToGetFullSizeImg + id_map + '.jpg'} rel="noreferrer" target="_blank" className="button-text-usual">Скачать изображение</a>

                        <button className="button-text-usual">Клонировать (в разработке)</button>
                    </div>

                    <div className='flex-row-left-top flex-gap-15 flex-wrap'>
                        {tags.map((tag, index) => (
                            <div key={index} className='tagBox flex-row-sb-c flex-gap-5'>
                                <p>{tag.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Link to="#" className='button-text-usual' onClick={() => window.history.back()}>
                Вернуться назад
            </Link>

            <ToastContainer theme="dark"/>
        </section>
    );
}