import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useServerMapOperationsStore } from 'store/store';

import GearImage from '../../assets/icons/Gear.png';
import PencilImage from '../../assets/icons/Pencil.png';

export default function PersonalMapCard({ id, name, updatedAt }) {
    const navigate = useNavigate();

    const {
        urlToGetPreviewImg,
    } = useServerMapOperationsStore();

    const handleStartEdit = (id) => {
        navigate(`/editor/${id}`);
    };

    const handleEditMapSettings = (id) => {
        navigate(`/maps/personalSingleMap/${id}`);
    };

    // Функция для извлечения понятной даты
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString().slice(0, 10);
    };

    return (
        <div className="flex-col-sb-c background-gray-search flex-gap-15 personalMapCard">
            <div className='flex-row-sb-c mapCardButtons'>
                <button className='button-image-small'>
                    <img src={GearImage} alt="Настройки" onClick={() => handleEditMapSettings(id)} />
                </button>

                <button className='button-image-small' onClick={() => handleStartEdit(id)}>
                    <img src={PencilImage} alt="Перейти к рисованию"/> 
                </button>
            </div>
        
            <img src={urlToGetPreviewImg + id + '.jpg'} className="mapCardImg" alt={name} />

            <div className="flex-row-sb-c mapCardContent">
                <h3>{name}</h3>
                
                <p>{formatDate(updatedAt)}</p>
            </div>
        </div>
    );
}