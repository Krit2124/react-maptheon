import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ToastContainer } from 'react-toastify';

import { useServerMapOperationsStore, useServerTagOperationsStore } from 'store/store';
import LikeCounter from '../sharedElements/likeCounter';

import favouriteImage from "../../assets/icons/Favourite.png";

export default function SingleMapPage() {
    const { 
        urlToGetFullSizeImg,
    } = useServerMapOperationsStore();

    const { 
        tagsForMap,
    } = useServerTagOperationsStore();

    const [mapId, setMapId] = useState('');
    const [mapName, setMapName] = useState('Название карты');
    const [likeAmount, setLikeAmount] = useState(0);
    const [mapDescription, setMapDescription] = useState('Описание карты');
    const [createdAt, setCreatedAt] = useState('2024-05-14 15:55:48');
    const [updatedAt, setUpdatedAt] = useState('2024-05-14 15:55:48');

    const [creatorName, setCreatorName] = useState('Имя пользователя');

    const [tags, setTags] = useState([]);

    const fetchMapSettings = async () => {
        try {
            const id = Cookies.get('idViewingMap');
            setMapId(id);
            // const mapSettings = await myMapSettings(id);
            // setMapName(mapSettings.name);
            // setMapDescription(mapSettings.description);
            // setLikeAmount(mapSettings.number_in_favourites);
            // setCreatedAt(mapSettings.createdAt);
            // setUpdatedAt(mapSettings.updatedAt);
            // setIsMapPublic(mapSettings.is_public);
        } catch (e) {
            console.log(e);
        }
    };

    const fetchTags = async () => {
        try {
            const id = Cookies.get('idViewingMap');
            const newTags = await tagsForMap(id);
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
        <section className="background-gray-default size-full-vertical-pagePercent-withHeader">
            <div className="container-fullScreen size-full-vertical-pagePercent-withHeader flex-row-c-c flex-gap-50">
                <div className="mapFillSizeImage">
                    <img src={urlToGetFullSizeImg + mapId + '.jpg'} alt="Карта" />
                </div>

                <div className='flex-col-sb-left flex-gap-30 container-mapInfo'>
                    <div className='flex-row-c-c size-full-horizontal-percent'>
                        <h1>{creatorName}</h1>
                    </div>

                    <div className='flex-row-sb-c size-full-horizontal-percent'>
                        <h1>{mapName}</h1>

                        <div className="flex-row-sb-c flex-gap-10">
                            <p>{likeAmount}</p>
                            <img src={favouriteImage} alt="Количество в избранном" className="size-image-small" />
                        </div>
                    </div>

                    <div className='size-full-horizontal-percent'>
                        <p>{mapDescription}</p>
                    </div>

                    <div className='flex-col-sb-left flex-gap-10 size-full-horizontal-percent'>
                        <p>Дата создания: {formatDate(createdAt)}</p>
                        <p>Дата обновления: {formatDate(updatedAt)}</p>
                    </div>

                    <div className='flex-row-sb-c size-full-horizontal-percent'>
                        <div className="flex-col-sb-left flex-gap-10">
                            <a href={urlToGetFullSizeImg + mapId + '.jpg'} download={`${mapName}.jpg`} type='image/jpeg' className="button-text-usual">Скачать изображение</a>
                            <button className="button-text-usual">Перейти в редактор карты</button>
                        </div>

                        <div className="flex-col-sb-right flex-gap-10">
                            <button className="button-text-usual">Удалить карту</button>
                            <button className="button-text-usual">Карта публичная</button>
                        </div>
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

            <ToastContainer theme="dark"/>
        </section>
    );
}