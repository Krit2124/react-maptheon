import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import GearImage from '../../assets/icons/Gear.png';
import PencilImage from '../../assets/icons/Pencil.png';

export default function PersonalMapCard({key, id, name, updatedAt, imagePath}) {
    const navigate = useNavigate();

    const handleStartEdit = (id) => {
        Cookies.set('idEditingMap', id, { expires: 30 });
        navigate(`/editor`);
    };

    const handleEditMapSettings = (id) => {
        Cookies.set('idEditingMap', id, { expires: 30 });
        navigate(`/maps/personalSingleMap`);
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
        
            <img src={imagePath} className="mapCardImg" alt={name} />

            <div className="flex-row-sb-c mapCardContent">
                <h3>{name}</h3>
                
                <p>{formatDate(updatedAt)}</p>
            </div>
        </div>
    );
}