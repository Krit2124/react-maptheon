import React, { useState } from 'react';

import mirroringImage from "../../../assets/icons/Mirroring.png"

export default function ObjectSettings() {
    const [objectSize, setObjectSize] = useState(20);
    const [objectOpacity, setObjectOpacity] = useState(1);
    const [objectRotation, setObjectRotation] = useState(0);
    const [objectSaturation, setObjectSaturation] = useState(0.5);
    const [objectBrightness, setObjectBrightness] = useState(0.5);
    const [objectContrast, setObjectContrast] = useState(0.5);

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
                    <div className='flex-row-sb-c flex-gap-8'>
                        <div className='bigObjectPlaceholder'></div>

                        <div className='flex-col-sb-c flex-gap-6'>
                            <div className='smallObjectPlaceholder'></div>
                            <div className='smallObjectPlaceholder'></div>
                        </div>

                        <div className='flex-col-sb-c flex-gap-6'>
                            <div className='smallObjectPlaceholder'></div>
                            <div className='smallObjectPlaceholder'></div>
                        </div>

                        <div className='flex-col-sb-c flex-gap-6'>
                            <div className='smallObjectPlaceholder'></div>
                            <div className='smallObjectPlaceholder'></div>
                        </div>
                    </div>

                    <button className="button-text-usual active">Использовать случайные</button>
                </div>
                
                <div className='flex-col-top-left flex-gap-10'>
                    <p>Недавно использованные</p>

                    <div className='flex-row-sb-c flex-gap-8'>
                        <div className='mediumObjectPlaceholder'></div>
                        <div className='mediumObjectPlaceholder'></div>
                        <div className='mediumObjectPlaceholder'></div>
                        <div className='mediumObjectPlaceholder'></div>
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
                    <button className='button-image-medium'>
                        <img src={mirroringImage} alt="Отзеркалить по горизонтали"/>
                    </button>

                    <button className='button-image-medium'>
                        <img src={mirroringImage} alt="Отзеркалить по вертикали" className='rotate-left'/>
                    </button>
                </div>
            </div>

            <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                <p>Насыщенность</p>

                <div className="flex-row-sb-c size-full-horizontal-percent">
                    <input type="range" min="0" max="1" step={0.01} value={objectSaturation} onChange={(e) => handleSliderChange(parseFloat(e.target.value), setObjectSaturation)}/>
                    <input type="number" min="0" max="1" step={0.01} value={objectSaturation} onChange={(e) => handleInputChange(parseFloat(e.target.value), setObjectSaturation, 0, 1)}/>
                </div>
            </div>

            <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                <p>Яркость</p>

                <div className="flex-row-sb-c size-full-horizontal-percent">
                    <input type="range" min="0" max="1" step={0.01} value={objectBrightness} onChange={(e) => handleSliderChange(parseFloat(e.target.value), setObjectBrightness)}/>
                    <input type="number" min="0" max="1" step={0.01} value={objectBrightness} onChange={(e) => handleInputChange(parseFloat(e.target.value), setObjectBrightness, 0, 1)}/>
                </div>
            </div>

            <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                <p>Контрастность</p>

                <div className="flex-row-sb-c size-full-horizontal-percent">
                    <input type="range" min="0" max="1" step={0.01} value={objectContrast} onChange={(e) => handleSliderChange(parseFloat(e.target.value), setObjectContrast)}/>
                    <input type="number" min="0" max="1" step={0.01} value={objectContrast} onChange={(e) => handleInputChange(parseFloat(e.target.value), setObjectContrast, 0, 1)}/>
                </div>
            </div>
        </div>
    );
}