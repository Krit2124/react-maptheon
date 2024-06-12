import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { useServerMapOperationsStore, useServerTagOperationsStore } from 'store/store';

import favouriteImage from "../../assets/icons/Favourite.png";
import deleteImage from "../../assets/icons/Close.png";
import plusImage from "../../assets/icons/Plus.png";

export default function PersonalSingleMapPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const { 
        urlToGetFullSizeImg,
        myMapSettings,
        updateMapName,
        updateMapDescription,
        updateMapPublicStatus,
        deleteMap,
    } = useServerMapOperationsStore();

    const { 
        tagsForMap,
        bindTagToMap,
        deleteTag, 
    } = useServerTagOperationsStore();

    const [mapName, setMapName] = useState('');
    const [likeAmount, setLikeAmount] = useState(0);
    const [mapDescription, setMapDescription] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [updatedAt, setUpdatedAt] = useState('');
    const [isMapPublic, setIsMapPublic] = useState(false);

    const [tags, setTags] = useState([]);
    const [isAddingTag, setIsAddingTag] = useState(false);
    const [newTag, setNewTag] = useState('');

    const handleDeleteTag = async (tagToDelete) => {
        const tagToDeleteObj = tags.find(tag => tag.name === tagToDelete);
        if (tagToDeleteObj) {
            try {
                await deleteTag(id, tagToDeleteObj.id);
                setTags(tags.filter(tag => tag.name !== tagToDelete));
            } catch (e) {
                console.log(e);
            }
        }
    };

    const handleAddTag = () => {
        setIsAddingTag(true);
    };

    const handleTagInputBlur = async () => {
        if (newTag.trim()) {
            const trimmedTag = newTag.trim();
            if (!tags.find(tag => tag.name === trimmedTag)) {
                try {
                    toast(await bindTagToMap(trimmedTag, id));
                    const updatedTags = await tagsForMap(id);
                    setTags(updatedTags);
                } catch (e) {
                    console.log(e);
                }
            } else {
                toast('Тег уже существует');
            }
        }
        setNewTag('');
        setIsAddingTag(false);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString().slice(0, 10);
    };

    const fetchMapSettings = async () => {
        try {
            const mapSettings = await myMapSettings(id);
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

    const fetchTags = async () => {
        try {
            const newTags = await tagsForMap(id);
            setTags(newTags);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchMapSettings();
        fetchTags();
    }, []);

    const handleMapNameChange = async (newName) => {
        try {
            if (newName !== '')  {
                toast(await updateMapName(id, newName));
            } else {
                toast('Название карты не может быть пустым');
            }
            
            setMapName(newName);
        } catch (e) {
            console.log(e);
        }
    };

    const handleMapDescriptionChange = async (newDescription) => {
        try {
            toast(await updateMapDescription(id, newDescription));
            setMapDescription(newDescription);
        } catch (e) {
            console.log(e);
        }
    };

    const handleMapPublicStatusChange = async () => {
        try {
            toast(await updateMapPublicStatus(id, !isMapPublic));
            setIsMapPublic(!isMapPublic);
        } catch (e) {
            console.log(e);
        }
    };

    const handleStartEdit = () => {
        navigate(`/editor/${id}`);
    };

    const handleDeleteMap = async () => {
        if (window.confirm("Вы действительно хотите удалить эту карту?")) {
            try {
                await deleteMap(id);
                navigate('/maps/personal/yours');
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <section className="background-gray-default size-full-vertical-pagePercent-withHeader">
            <div className="container-fullScreen size-full-vertical-pagePercent-withHeader flex-row-c-c flex-gap-50">
                <div className="mapFillSizeImage">
                    <img src={urlToGetFullSizeImg + id + '.jpg'} alt="Карта" />
                </div>

                <div className='flex-col-sb-left flex-gap-30 container-mapInfo'>
                    <div className='flex-row-sb-c size-full-horizontal-percent'>
                        <input 
                            type="text" 
                            value={mapName} 
                            onChange={(e) => setMapName(e.target.value)}
                            onBlur={() => handleMapNameChange(mapName)}
                            className="textInput-usual" 
                        />

                        <div className="flex-row-sb-c flex-gap-10">
                            <p>{likeAmount}</p>
                            <img src={favouriteImage} alt="Количество в избранном" className="size-image-small" />
                        </div>
                    </div>

                    <div className='size-full-horizontal-percent'>
                        <textarea 
                            value={mapDescription} 
                            onChange={(e) => setMapDescription(e.target.value)}
                            onBlur={() => handleMapDescriptionChange(mapDescription)}
                            rows={5}
                            className="textInput-usual size-full-horizontal-percent" 
                        />
                    </div>

                    <div className='flex-col-sb-left flex-gap-10 size-full-horizontal-percent'>
                        <p>Дата создания: {formatDate(createdAt)}</p>
                        <p>Дата обновления: {formatDate(updatedAt)}</p>
                    </div>

                    <div className='flex-row-sb-c size-full-horizontal-percent'>
                        <div className="flex-col-sb-left flex-gap-10">
                            <a href={urlToGetFullSizeImg + id + '.jpg'} download={`${mapName}.jpg`} type='image/jpeg' className="button-text-usual">Скачать изображение</a>
                            <button className="button-text-usual" onClick={handleStartEdit}>Перейти в редактор карты</button>
                        </div>

                        <div className="flex-col-sb-right flex-gap-10">
                            <button className="button-text-usual" onClick={handleDeleteMap}>Удалить карту</button>
                            <button 
                                className={`button-text-usual ${isMapPublic ? 'active' : ''}`} 
                                onClick={handleMapPublicStatusChange}
                            >
                                {isMapPublic ? 'Карта публичная' : 'Карта не публичная'}
                            </button>
                        </div>
                    </div>

                    <div className='flex-row-left-top flex-gap-15 flex-wrap'>
                        {tags.map((tag, index) => (
                            <div key={index} className='tagBox flex-row-sb-c flex-gap-5'>
                                <p>{tag.name}</p>
                                <button onClick={() => handleDeleteTag(tag.name)}><img src={deleteImage} alt="Удалить" /></button>
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

            <ToastContainer theme="dark"/>
        </section>
    );
}