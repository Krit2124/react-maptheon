import React, { useState } from 'react';

import roundBrushImage from "../../../assets/icons/RoundBrush.png"
import rectangleBrushImage from "../../../assets/icons/RectangleBrush.png"
import { ChromePicker } from 'react-color';

export default function BrushSettings({ brushColor, setBrushColor, currentBrushLayer, setCurrentBrushLayer, brushThickness, setBrushThickness, brushOpacity, setBrushOpacity, brushSoftness, setBrushtSoftness, }) {

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

    // Обработка смены цвета кисти
    const handleChangeBackgroundColor = (color) => {
        setBrushColor(color.hex);
    };

    // Обработка смены слоя кисти
    const handleLayerButtonClick = (layer) => {
        setCurrentBrushLayer(layer);
    };

    return (
        <div className='flex-col-top-left flex-gap-25 size-full-horizontal-percent'>
            <div className='flex-col-top-left flex-gap-15'>
                <div className='flex-col-top-left flex-gap-10'>
                    <div className="flex-row-left-c flex-gap-10">
                        <button className="button-text-usual">Текстура</button>
                        <button className="button-text-usual active">Цвет</button>
                    </div>

                    <ChromePicker color={brushColor} onChange={handleChangeBackgroundColor}/>
                </div>

                {/* Показывать для текстур, скрыть для цвета */}
                {/* <div className='flex-col-top-left flex-gap-10'>
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
                </div> */}

                <div className='flex-col-top-left flex-gap-10'>
                    <p>Изменяемый слой</p>

                    <div className="flex-row-left-c flex-gap-10">
                    <button
                        className={`button-text-usual ${currentBrushLayer === 'lower' ? 'active' : ''}`}
                        onClick={() => handleLayerButtonClick('lower')}
                    >
                        Фон
                    </button>

                    <button
                        className={`button-text-usual ${currentBrushLayer === 'upper' ? 'active' : ''}`}
                        onClick={() => handleLayerButtonClick('upper')}
                    >
                        Верхний слой
                    </button>
                    </div>
                </div>

                <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                    <p>Толщина кисти</p>

                    <div className="flex-row-sb-c size-full-horizontal-percent">
                        <input type="range" min="1" max="200" value={brushThickness} onChange={(e) => handleSliderChange(parseInt(e.target.value), setBrushThickness)}/>
                        <input type="number" min="1" max="200" value={brushThickness} onChange={(e) => handleInputChange(parseInt(e.target.value), setBrushThickness, 1, 200)}/>
                    </div>
                </div>

                <div className="flex-row-sb-c size-full-horizontal-percent">
                    <p>Форма кисти</p>

                    <div className='flex-row-sb-c flex-gap-5'>
                        <button className='button-image-medium active'>
                            <img src={roundBrushImage} alt="Круглая"/>
                        </button>

                        <button className='button-image-medium'>
                            <img src={rectangleBrushImage} alt="Квадратная"/>
                        </button>
                    </div>
                </div>

                <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                    <p>Прозрачность</p>

                    <div className="flex-row-sb-c size-full-horizontal-percent">
                        <input type="range" min="0" max="1" step={0.01} value={brushOpacity} onChange={(e) => handleSliderChange(parseFloat(e.target.value), setBrushOpacity)}/>
                        <input type="number" min="0" max="1" step={0.01} value={brushOpacity} onChange={(e) => handleInputChange(parseFloat(e.target.value), setBrushOpacity, 0, 1)}/>
                    </div>
                </div>

                <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                    <p>Мягкость</p>

                    <div className="flex-row-sb-c size-full-horizontal-percent">
                        <input type="range" min="0" max="1" step={0.01} value={brushSoftness} onChange={(e) => handleSliderChange(parseFloat(e.target.value), setBrushtSoftness)}/>
                        <input type="number" min="0" max="1" step={0.01} value={brushSoftness} onChange={(e) => handleInputChange(parseFloat(e.target.value), setBrushtSoftness, 0, 1)}/>
                    </div>
                </div>
            </div>
        </div>
    );
}