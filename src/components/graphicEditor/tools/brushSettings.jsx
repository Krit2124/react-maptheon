import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

import roundBrushImage from "../../../assets/icons/RoundBrush.png";
import rectangleBrushImage from "../../../assets/icons/RectangleBrush.png";

export default function BrushSettings({ 
    recentlyUsedTextures, setRecentlyUsedTextures,

    brushColorMode, setBrushColorMode, currentBrushTexture, setCurrentBrushTexture, brushColor, setBrushColor, currentBrushLayer, setCurrentBrushLayer, brushThickness, setBrushThickness, brushShape, setBrushShape, brushOpacity, setBrushOpacity, brushSoftness, setBrushtSoftness, }) {
    // Обработка ползунков
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

    // Обработка переключения текстуры и цвета
    const handleToggleMode = (value) => {
        setBrushColorMode(value);
    };

    // Обработка смены текстуры
    const handleTextureClick = (texture) => {
        setCurrentBrushTexture(texture);
        updateRecentlyUsedTextures(texture);
    };

    const updateRecentlyUsedTextures = (texture) => {
        // Проверка, была ли выбрана эта текстура ранее
        if (!recentlyUsedTextures.includes(texture)) {
            // Если текстура новая, добавляем её в начало списка
            setRecentlyUsedTextures([texture, ...recentlyUsedTextures]);
        } else {
            // Если текстура уже была выбрана, перемещаем её в начало списка
            const updatedTextures = recentlyUsedTextures.filter((item) => item !== texture);
            setRecentlyUsedTextures([texture, ...updatedTextures]);
        }
    };
    
    // Обработка смены цвета кисти
    const handleChangeBackgroundColor = (color) => {
        setBrushColor(color.hex);
    };

    // Обработка смены слоя кисти
    const handleLayerButtonClick = (layer) => {
        setCurrentBrushLayer(layer);
    };

    // Обработка смены формы кисти
    const handleToggleBrushShape = (value) => {
        setBrushShape(value);
    };

    return (
        <div className='flex-col-top-left flex-gap-25 size-full-horizontal-percent'>
            <div className='flex-col-top-left flex-gap-15'>
                <div className='flex-col-top-left flex-gap-10'>
                    <div className="flex-row-left-c flex-gap-10">
                        <button className={`button-text-usual ${brushColorMode === 'texture' ? 'active' : ''}`} onClick={() => handleToggleMode('texture')}>Текстура</button>
                        <button className={`button-text-usual ${brushColorMode === 'color' ? 'active' : ''}`} onClick={() => handleToggleMode('color')}>Цвет</button>
                        <button className={`button-text-usual ${brushColorMode === 'eraser' ? 'active' : ''}`} onClick={() => handleToggleMode('eraser')}>Ластик</button>
                    </div>

                    {brushColorMode === 'color' ? (
                        <ChromePicker color={brushColor} onChange={handleChangeBackgroundColor} />
                    ) : brushColorMode === 'texture' ? (
                        <div className='flex-col-top-left flex-gap-10'>
                            <div className='currentTexture' style={{ backgroundImage: currentBrushTexture ? `url(${currentBrushTexture})` : 'none' }}>
                                {currentBrushTexture && <div className="overlay"></div>}
                            </div>

                            <p>Недавно использованные</p>
                            <div className='flex-row-left-c flex-wrap flex-gap-5 recentlyUsedContainer'>
                                {recentlyUsedTextures.map((texture, index) => (
                                    <div key={index} className='recentTexture' style={{ backgroundImage: `url(${texture})` }} onClick={() => handleTextureClick(texture)} />
                                ))}
                            </div>
                        </div>
                    ) : ""}
                </div>

                <div className='flex-col-top-left flex-gap-10'>
                    <p>Изменяемый слой</p>

                    <div className="flex-row-left-c flex-gap-10">
                    <button className={`button-text-usual ${currentBrushLayer === 'lower' ? 'active' : ''}`} onClick={() => handleLayerButtonClick('lower')}>
                        Фон
                    </button>

                    <button className={`button-text-usual ${currentBrushLayer === 'upper' ? 'active' : ''}`} onClick={() => handleLayerButtonClick('upper')}>
                        Верхний слой
                    </button>
                    </div>
                </div>

                <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                    <p>Толщина кисти</p>

                    <div className="flex-row-sb-c flex-gap-40 size-full-horizontal-percent">
                        <input type="range" min="1" max="200" value={brushThickness} onChange={(e) => handleSliderChange(parseInt(e.target.value), setBrushThickness)}/>
                        <input type="number" min="1" max="200" value={brushThickness} onChange={(e) => handleInputChange(parseInt(e.target.value), setBrushThickness, 1, 200)}/>
                    </div>
                </div>

                <div className="flex-row-sb-c size-full-horizontal-percent">
                    <p>Форма кисти</p>

                    <div className='flex-row-sb-c flex-gap-5'>
                        <button className={`button-image-medium ${brushShape === 'round' ? 'active' : ''}`} onClick={() => handleToggleBrushShape('round')}>
                            <img src={roundBrushImage} alt="Круглая"/>
                        </button>


                        <button className={`button-image-medium ${brushShape === 'square' ? 'active' : ''}`} onClick={() => handleToggleBrushShape('square')}>
                            <img src={rectangleBrushImage} alt="Квадратная"/>
                        </button>
                    </div>
                </div>

                {brushColorMode === 'color' &&
                    <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                        <p>Прозрачность</p>

                        <div className="flex-row-sb-c size-full-horizontal-percent">
                            <input type="range" min="0" max="1" step={0.01} value={brushOpacity} onChange={(e) => handleSliderChange(parseFloat(e.target.value), setBrushOpacity)}/>
                            <input type="number" min="0" max="1" step={0.01} value={brushOpacity} onChange={(e) => handleInputChange(parseFloat(e.target.value), setBrushOpacity, 0, 1)}/>
                        </div>
                    </div>
                }

                {/* <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                    <p>Мягкость</p>

                    <div className="flex-row-sb-c size-full-horizontal-percent">
                        <input type="range" min="0" max="1" step={0.01} value={brushSoftness} onChange={(e) => handleSliderChange(parseFloat(e.target.value), setBrushtSoftness)}/>
                        <input type="number" min="0" max="1" step={0.01} value={brushSoftness} onChange={(e) => handleInputChange(parseFloat(e.target.value), setBrushtSoftness, 0, 1)}/>
                    </div>
                </div> */}
            </div>
        </div>
    );
}