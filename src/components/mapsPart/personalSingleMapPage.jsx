import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import { useServerMapOperationsStore, useServerTagOperationsStore } from 'store/store';

import favouriteImage from "../../assets/icons/Favourite.png";
import deleteImage from "../../assets/icons/Close.png";
import plusImage from "../../assets/icons/Plus.png";

export default function PersonalSingleMapPage() {
    const { 
        myMapSettings
    } = useServerMapOperationsStore();

    const { 
        tagsForMap,
        bindTagToMap,
        saveMapData, 
    } = useServerTagOperationsStore();

    // Информация о карте
    const [mapImage, setMapImage] = useState('');
    const [mapName, setMapName] = useState('Название карты');
    const [likeAmount, setLikeAmount] = useState(0);
    const [mapDescription, setMapDescription] = useState('Описание карты');
    const [createdAt, setCreatedAt] = useState('13.05.2024');
    const [updatedAt, setUpdatedAt] = useState('14.05.2024');
    const [isMapPublic, setIsMapPublic] = useState(false);

    // Информация о тегах
    const [tags, setTags] = useState(['Тег 1', 'Тег 2', 'Тег 3', 'Тег 4']);
    const [isAddingTag, setIsAddingTag] = useState(false);
    const [newTag, setNewTag] = useState('');

    const handleDeleteTag = (tagToDelete) => {
        setTags(tags.filter(tag => tag !== tagToDelete));
    };

    const handleAddTag = () => {
        setIsAddingTag(true);
    };

    const handleTagInputBlur = () => {
        if (newTag.trim()) {
            setTags([...tags, newTag.trim()]);
        }
        setNewTag('');
        setIsAddingTag(false);
    };

    // Функция для извлечения понятной даты
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString().slice(0, 10);
    };

    useEffect(() => {
        const fetchMapSettings = async () => {
            try {
                // Получение данных о карте из таблицы map
                let mapId = Cookies.get('idEditingMap');
                let mapSettings = await myMapSettings(mapId);
                console.log(mapSettings);
                setMapImage(mapSettings.image);
                setMapName(mapSettings.name);
                setMapDescription(mapSettings.description);
                setLikeAmount(mapSettings.number_in_favourites);
                setCreatedAt(mapSettings.createdAt);
                setUpdatedAt(mapSettings.updatedAt);
                setIsMapPublic(mapSettings.is_public);
            } catch (e) {
                console.log(e);
            }
        };

        fetchMapSettings();
    }, []);

    return (
        <section className="background-gray-default size-full-vertical-pagePercent-withHeader">
            <div className="container-fullScreen size-full-vertical-pagePercent-withHeader flex-row-c-c flex-gap-50">
                <div className="mapFillSizeImage">
                    <img src={mapImage} alt="Карта" />
                </div>

                <div className='flex-col-sb-left flex-gap-30 container-mapInfo'>
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
                            <button className="button-text-usual">Скачать изображение</button>
                            <button className="button-text-usual">Перейти в редактор карты</button>
                        </div>

                        <div className="flex-col-sb-right flex-gap-10">
                            <button className="button-text-usual">Удалить карту</button>
                            <button className={`button-text-usual ${isMapPublic ? 'active' : ''}`} onClick={() => setIsMapPublic(!isMapPublic)}>
                                {isMapPublic ? 'Карта публичная' : 'Карта не публичная'}
                            </button>
                        </div>
                    </div>

                    <div className='flex-row-left-top flex-gap-15 flex-wrap'>
                        {tags.map((tag, index) => (
                            <div key={index} className='tagBox flex-row-sb-c flex-gap-5'>
                                <p>{tag}</p>
                                <button onClick={() => handleDeleteTag(tag)}><img src={deleteImage} alt="Удалить" /></button>
                            </div>
                        ))}
                        {isAddingTag ? (
                            <div className='tagBox flex-row-sb-c flex-gap-5'>
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    onBlur={handleTagInputBlur}
                                    autoFocus
                                />
                            </div>
                        ) : (
                            <div className='tagBox flex-row-sb-c flex-gap-5'>
                                <button onClick={handleAddTag}><img src={plusImage} alt="Добавить" /></button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}