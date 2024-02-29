import React, { useState } from 'react';

import roundBrushImage from "../../assets/icons/RoundBrush.png"
import rectangleBrushImage from "../../assets/icons/RectangleBrush.png"

export default function BrushSettings() {
    const [thickness, setThickness] = useState(20);
    const [opacity, setOpacity] = useState(100);
    const [softness, setSoftness] = useState(100);

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

    return (
        <div className='flex-col-top-left flex-gap-25 size-full-horizontal-percent'>
            <div className='flex-col-top-left flex-gap-15'>
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

                <div className='flex-col-top-left flex-gap-10'>
                    <p>Изменяемый слой</p>

                    <div className="flex-row-left-c flex-gap-10">
                        <button className="button-text-usual">Фон</button>
                        <button className="button-text-usual active">Верхний слой</button>
                    </div>
                </div>

                <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                    <p>Толщина кисти</p>

                    <div className="flex-row-sb-c size-full-horizontal-percent">
                        <input type="range" min="1" max="250" value={thickness} onChange={(e) => handleSliderChange(parseInt(e.target.value), setThickness)}/>
                        <input type="number" min="1" max="250" value={thickness} onChange={(e) => handleInputChange(parseInt(e.target.value), setThickness, 1, 250)}/>
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
                    <p>Прозрачность (%)</p>

                    <div className="flex-row-sb-c size-full-horizontal-percent">
                        <input type="range" min="1" max="100" value={opacity} onChange={(e) => handleSliderChange(parseInt(e.target.value), setOpacity)}/>
                        <input type="number" min="1" max="100" value={opacity} onChange={(e) => handleInputChange(parseInt(e.target.value), setOpacity, 1, 100)}/>
                    </div>
                </div>

                <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                    <p>Мягкость (%)</p>

                    <div className="flex-row-sb-c size-full-horizontal-percent">
                        <input type="range" min="0" max="100" value={softness} onChange={(e) => handleSliderChange(parseInt(e.target.value), setSoftness)}/>
                        <input type="number" min="0" max="100" value={softness} onChange={(e) => handleInputChange(parseInt(e.target.value), setSoftness, 0, 100)}/>
                    </div>
                </div>
            </div>
        </div>
    );
}