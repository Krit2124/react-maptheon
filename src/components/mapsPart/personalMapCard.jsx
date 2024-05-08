import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { useServerMapOperationsStore } from 'store/store';

import GearImage from '../../assets/icons/Gear.png';
import PencilImage from '../../assets/icons/Pencil.png';

export default function PersonalMapCard({id, name, isPublic, updatedAt, imagePath}) {
    const { 
        selectedMapId, setSelectedMapId,
    } = useServerMapOperationsStore();

    const navigate = useNavigate();

    const handleStartEdit = (id) => {
        Cookies.set('idEditingCard', id, { expires: 30 });
        navigate(`/editor`);
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
                    <img src={GearImage} alt="Настройки"/>
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