import React, { useState } from 'react';

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

import chainImage from "../../../assets/icons/Chain.png"
import reverseImage from "../../../assets/icons/Reverse.png"
import showOrHideImage from "../../../assets/icons/ShowOrHide.png"
import eyeImage from "../../../assets/icons/Eye.png"

export default function CanvasSettings({canvasWidth, setCanvasWidth, canvasHeight, setCanvasHeight, filterIntensity, setFilterIntensity, isResetRequired, setIsResetRequired}) {
    // Обработка размеров холста и интенсивности
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

    // Обработка изменения размеров холста с учётом сохранения пропорций
    const [isAspectRatioLocked, setIsAspectRatioLocked] = useState(false);
    const [aspectRatio, setAspectRatio] = useState(1);

    const handleWidthChange = (value) => {
        if (isAspectRatioLocked) {
            const newHeight = Math.round(value / aspectRatio);
            setCanvasHeight(newHeight);
        }
        setCanvasWidth(value);
    };

    const handleHeightChange = (value) => {
        if (isAspectRatioLocked) {
            const newWidth = Math.round(value * aspectRatio);
            setCanvasWidth(newWidth);
        }
        setCanvasHeight(value);
    };

    const handleAspectRatioToggle = () => {
        if (!isAspectRatioLocked) setAspectRatio(canvasWidth / canvasHeight);
        setIsAspectRatioLocked(!isAspectRatioLocked);
    };

    // Обработка сброса масштабирования
    const handleZoomReset = () => {
        setIsResetRequired(true)
    };

    // Обработка накладываемого фильтра
    const [selectedFilter, setSelectedFilter] = useState('Название фильтра 1');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleFontSelect = (filterOption) => {
        setSelectedFilter(filterOption);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className='flex-col-top-left flex-gap-25 size-full-horizontal-percent'>
            <div className='flex-col-top-left flex-gap-10'>
                <h2>Размеры</h2>

                <div className="flex-row-sb-c flex-gap-15">
                    <div className="flex-col-sb-left flex-gap-10">
                        <p>Ширина</p>
                        <p>Высота</p>
                    </div>

                    <div className="flex-col-sb-left flex-gap-10">
                        <input type="number" min="0" max="10000" value={canvasWidth} onChange={(e) => handleWidthChange(parseInt(e.target.value))}/>

                        <input type="number" min="0" max="10000" value={canvasHeight} onChange={(e) => handleHeightChange(parseInt(e.target.value))}/>
                    </div>

                    <button className={`button-image-medium ${isAspectRatioLocked ? 'active' : ''}`} onClick={handleAspectRatioToggle}>
                        <img src={chainImage} alt="Пропорции"/>
                    </button>

                    <button className='button-image-medium'>
                        <img src={reverseImage} alt="Развернуть"/>
                    </button>
                </div>

                <button className='button-text-usual' onClick={handleZoomReset}>Сбросить масштабирование</button>
            </div>

            <div className='flex-col-top-left flex-gap-10'>
                <h2>Фон</h2>

                <div className='flex-col-top-left flex-gap-10'>
                    <div className="flex-row-left-c flex-gap-10">
                        <button className="button-text-usual">Текстура</button>
                        <button className="button-text-usual active">Цвет</button>
                    </div>

                    <div className='colorPlaceholder'></div>
                </div>

                <div className='flex-col-top-left flex-gap-10'>
                    <p>Недавно использованные</p>
                    <div className='flex-row-left-c flex-wrap flex-gap-5 recentlyUsedContainer'>
                        <div className='recentColorPlaceholder'></div>
                        <div className='recentColorPlaceholder'></div>
                        <div className='recentColorPlaceholder'></div>
                        <div className='recentColorPlaceholder'></div>
                        <div className='recentColorPlaceholder'></div>
                        <div className='recentColorPlaceholder'></div>
                        <div className='recentColorPlaceholder'></div>
                        <div className='recentColorPlaceholder'></div>
                    </div>
                </div>
            </div>

            <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                <h2>Фильтр</h2>

                <div className='flex-row-sb-c size-full-horizontal-percent'>
                    <DropdownButton className='flex-col-sb-right white-border-when-active'  onToggle={handleDropdownToggle} align="end" title={
                        <span className='button-text-usual'>
                            {selectedFilter}
                            <img
                                src={showOrHideImage}
                                alt="Показать или скрыть"
                                style={{
                                marginLeft: '15px',
                                width: '12px',
                                transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                                transition: 'transform 0.3s ease-in-out',
                                }}
                            />
                        </span>
                    }>
                        <div className='flex-col-sb-right'>
                            <Dropdown.Item onClick={() => handleFontSelect('Название фильтра 1')}>Название фильтра 1</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleFontSelect('Название фильтра 2')}>Название фильтра 2</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleFontSelect('Название фильтра 3')}>Название фильтра 3</Dropdown.Item>
                        </div>
                    </DropdownButton>

                    <button className='button-image-long active'>
                        <img src={eyeImage} alt="Скрыть/показать"/>
                    </button>
                </div>
                
                <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                    <p>Интенсивность</p>

                    <div className="flex-row-sb-c size-full-horizontal-percent">
                        <input type="range" min="0" max="1" step={0.01} value={filterIntensity} onChange={(e) => handleSliderChange(parseFloat(e.target.value), setFilterIntensity)}/>
                        <input type="number" min="0" max="1" step={0.01} value={filterIntensity} onChange={(e) => handleInputChange(parseFloat(e.target.value), setFilterIntensity, 0, 1)}/>
                    </div>
                </div>
            </div>
        </div>
    );
}