import React, { useState } from 'react';
import { useObjectSettingsState, useObjectsStore } from 'store/store';

import mirroringImage from "../../../assets/icons/Mirroring.png"

export default function ObjectSettings() {
    const {
        objectSize, setObjectSize,
        objectOpacity, setObjectOpacity,
        objectRotation, setObjectRotation,
        objectSaturation, setObjectSaturation,
        objectBrightness, setObjectBrightness,
        objectContrast, setObjectContrast,
        objectIsUseRandom, setObjectIsUseRandom,
        objectIsHorizontalMirrored, setObjectIsHorizontalMirrored,
        objectIsVerticalMirrored, setObjectIsVerticalMirrored,
    } = useObjectSettingsState();

    const {
        recentlyUsedObjects, setRecentlyUsedObjects,
    } = useObjectsStore();

    // Обработка параметров с ползунками
    const handleSliderChange = (value, setValue) => {
        setValue(value);
    };

    const handleInputChange = (value, setValue, min, max) => {
        if (value > max) {
            value = max;
        } else if (value < min) {
            value = min;
        }

        setValue(value);
    };

    // Обработка смены объектов
    // Группы
    const handleObjectGroupClick = (group) => {
        updateRecentlyUsedGroupOfObjects(group);
    };

    const updateRecentlyUsedGroupOfObjects = (group) => {
        // Проверка, была ли выбрана эта группа ранее
        const groupIndex = recentlyUsedObjects.findIndex(obj => obj === group);
    
        if (groupIndex === -1) {
            // Если группа новая, добавляем её в начало списка
            setRecentlyUsedObjects([group, ...recentlyUsedObjects]);
        } else if (groupIndex !== 0) {
            // Если группа уже была выбрана и не находится на первом месте, перемещаем её на первое место
            const updatedGroups = [...recentlyUsedObjects];
            updatedGroups.splice(groupIndex, 1);
            updatedGroups.unshift(group);
            setRecentlyUsedObjects(updatedGroups);
        }
    };

    // Конкретного объекта
    const handleObjectClick = (image) => {
        updateRecentlyUsedObjectOrder(image);
    };
    
    const updateRecentlyUsedObjectOrder = (selectedImage) => {
        // Находим индекс выбранного объекта в группе
        const groupIndex = Object.values(recentlyUsedObjects[0]).findIndex(img => img === selectedImage);
    
        if (groupIndex !== -1 && groupIndex !== 0) {
            // Клонируем массив объектов в выбранной группе
            const updatedGroup = [...Object.values(recentlyUsedObjects[0])];
            
            // Удаляем выбранный объект из массива и добавляем его на первое место
            updatedGroup.splice(groupIndex, 1);
            updatedGroup.unshift(selectedImage);
    
            // Обновляем состояние recentlyUsedObjects
            const updatedObjects = [...recentlyUsedObjects];
            updatedObjects[0] = Object.fromEntries(updatedGroup.map((image, index) => [index, image]));
            
            setRecentlyUsedObjects(updatedObjects);
        }
    };

    return (
        <div className='flex-col-top-left flex-gap-25 size-full-horizontal-percent'>
            <div className='flex-col-top-left flex-gap-15'>
                <div className='flex-col-top-left flex-gap-10'>
                    <div className='flex-row-sb-c flex-gap-8'>
                        {/* Первый (текущий) объект */}
                        <div className='mainObject' style={{ backgroundImage: `url(${Object.values(recentlyUsedObjects[0])[0]})` }}></div>

                        <div className='otherObjectsBox flex-row-left-top flex-wrap flex-gap-6'>
                            {Object.values(recentlyUsedObjects[0]).map((image, index) => (
                                // Пропускаем первое изображение, так как оно уже отображено выше
                                index === 0 ? null :
                                <div key={index} className='otherObject' style={{ backgroundImage: `url(${image})` }} onClick={() => handleObjectClick(image)}/>
                            ))}
                        </div>
                    </div>

                    <button className={`button-text-usual ${objectIsUseRandom === true ? 'active' : ''}`} onClick={() => setObjectIsUseRandom(!objectIsUseRandom)}>Использовать случайные</button>
                </div>
                
                <div className='flex-col-top-left flex-gap-10'>
                    <p>Недавно использованные</p>

                    <div className='flex-row-sb-c flex-gap-7'>
                        {recentlyUsedObjects.map((group, index) => {
                            const firstImage = Object.values(group)[0];
                            return (
                                <div key={index} className='recentGroupOfObjects' style={{ backgroundImage: `url(${firstImage})` }} onClick={() => handleObjectGroupClick(group)}></div>
                            );
                        })}
                    </div>
                </div>
            </div>
            

            <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                <p>Размер</p>

                <div className="flex-row-sb-c size-full-horizontal-percent">
                    <input type="range" min="1" max="500" value={objectSize} onChange={(e) => handleSliderChange(parseInt(e.target.value), setObjectSize)}/>
                    <input type="number" min="1" max="500" value={objectSize} onChange={(e) => handleInputChange(parseInt(e.target.value), setObjectSize, 1, 500)}/>
                </div>
            </div>

            <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                <p>Прозрачность</p>

                <div className="flex-row-sb-c size-full-horizontal-percent">
                    <input type="range" min="0" max="1" step={0.01} value={objectOpacity} onChange={(e) => handleSliderChange(parseFloat(e.target.value), setObjectOpacity)}/>
                    <input type="number" min="0" max="1" step={0.01} value={objectOpacity} onChange={(e) => handleInputChange(parseFloat(e.target.value), setObjectOpacity, 0, 1)}/>
                </div>
            </div>

            <div className="flex-row-sb-c size-full-horizontal-percent">
                <div className="flex-row-sb-c flex-gap-10">
                    <p>Поворот (°)</p>
                    <input type="number" min="0" max="360" value={objectRotation} onChange={(e) => handleInputChange(parseInt(e.target.value), setObjectRotation, 0, 360)}/>
                </div>

                <div className="flex-row-sb-c flex-gap-10">
                    <button className={`button-image-medium ${objectIsHorizontalMirrored === true ? 'active' : ''}`} onClick={() => setObjectIsHorizontalMirrored(!objectIsHorizontalMirrored)}>
                        <img src={mirroringImage} alt="Отзеркалить по горизонтали" className='rotate-left'/>
                    </button>

                    <button className={`button-image-medium ${objectIsVerticalMirrored === true ? 'active' : ''}`} onClick={() => setObjectIsVerticalMirrored(!objectIsVerticalMirrored)}>
                        <img src={mirroringImage} alt="Отзеркалить по вертикали"/>
                    </button>
                </div>
            </div>

            <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                <p>Насыщенность</p>

                <div className="flex-row-sb-c size-full-horizontal-percent">
                    <input type="range" min="-1" max="1" step={0.01} value={objectSaturation} onChange={(e) => handleSliderChange(parseFloat(e.target.value), setObjectSaturation)}/>
                    <input type="number" min="-1" max="1" step={0.01} value={objectSaturation} onChange={(e) => handleInputChange(parseFloat(e.target.value), setObjectSaturation, -1, 1)}/>
                </div>
            </div>

            <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                <p>Яркость</p>

                <div className="flex-row-sb-c size-full-horizontal-percent">
                    <input type="range" min="-1" max="1" step={0.01} value={objectBrightness} onChange={(e) => handleSliderChange(parseFloat(e.target.value), setObjectBrightness)}/>
                    <input type="number" min="-1" max="1" step={0.01} value={objectBrightness} onChange={(e) => handleInputChange(parseFloat(e.target.value), setObjectBrightness, -1, 1)}/>
                </div>
            </div>

            <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                <p>Контрастность</p>

                <div className="flex-row-sb-c size-full-horizontal-percent">
                    <input type="range" min="-1" max="1" step={0.01} value={objectContrast} onChange={(e) => handleSliderChange(parseFloat(e.target.value), setObjectContrast)}/>
                    <input type="number" min="-1" max="1" step={0.01} value={objectContrast} onChange={(e) => handleInputChange(parseFloat(e.target.value), setObjectContrast, -1, 1)}/>
                </div>
            </div>
        </div>
    );
}