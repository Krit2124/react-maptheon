import React, { useState } from 'react';

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

import showOrHideImage from "../../assets/icons/ShowOrHide.png"
import boldFontImage from "../../assets/icons/BoldFont.png"
import italicFontImage from "../../assets/icons/ItalicFont.png"
import leftAlignmentImage from "../../assets/icons/LeftAlignment.png"
import centerAlignmentImage from "../../assets/icons/CenterAlignment.png"
import rightAlignmentImage from "../../assets/icons/RightAlignment.png"
import mirroringImage from "../../assets/icons/Mirroring.png"

export default function LabelSettings() {
    // Обработка изменения шрифта
    const [selectedFont, setSelectedFont] = useState('Название шрифта 1');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleFontSelect = (fontOption) => {
        setSelectedFont(fontOption);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Обработка изменения свойств шрифта
    const [fontSize, setFontSize] = useState(20);
    const [letterSpacing, setLetterSpacing] = useState(0.5);
    const [lineSpacing, setLineSpacing] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [borderWidth, setBorderWidth] = useState(0);

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
            <div className='flex-col-sb-left flex-gap-10 size-full-horizontal-percent'>
                <p>Текст</p>
                <input type="text" className="textInput-usual size-full-horizontal-percent"/>
            </div>

            <div className="flex-row-sb-c size-full-horizontal-percent">
                <p>Шрифт</p>

                <DropdownButton className='flex-col-sb-right'  onToggle={handleDropdownToggle} align="end" title={
                    <span className=' button-text-usual'>
                        {selectedFont}
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
                        <Dropdown.Item onClick={() => handleFontSelect('Название шрифта 1')}>Название шрифта 1</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFontSelect('Название шрифта 2')}>Название шрифта 2</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFontSelect('Название шрифта 3')}>Название шрифта 3</Dropdown.Item>
                    </div>
                </DropdownButton>
            </div>

            <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                <p>Размер шрифта</p>

                <div className="flex-row-sb-c size-full-horizontal-percent">
                    <input type="range" min="8" max="72" value={fontSize} onChange={(e) => handleSliderChange(parseInt(e.target.value), setFontSize)}/>
                    <input type="number" min="8" max="72" value={fontSize} onChange={(e) => handleInputChange(parseInt(e.target.value), setFontSize, 8, 72)}/>
                </div>
            </div>

            <div className="flex-row-sb-c flex-gap-15">
                <div className="flex-col-sb-left flex-gap-10">
                    <p>Цвет текста</p>
                    <p>Обводка</p>
                </div>

                <div className="flex-col-sb-left flex-gap-10">
                    <div className='fontColorPlaceholder'></div>
                    <div className='flex-row-sb-c flex-gap-15'>
                        <div className='fontColorPlaceholder'></div>
                        <input type="number" min="0" max="20" value={borderWidth} onChange={(e) => handleInputChange(parseFloat(e.target.value), setBorderWidth, 0, 20)}/>
                    </div>
                </div>
            </div>

            <div className="flex-row-sb-c size-full-horizontal-percent">
                <div className="flex-row-sb-c flex-gap-5">
                    <button className='button-image-medium'>
                        <img src={boldFontImage} alt="Жирный шрифт"/>
                    </button>

                    <button className='button-image-medium'>
                        <img src={italicFontImage} alt="Курсивный шрифт"/>
                    </button>
                </div>

                <div className="flex-row-sb-c flex-gap-5">
                    <button className='button-image-medium active'>
                        <img src={leftAlignmentImage} alt="Выравнивание по левому краю"/>
                    </button>

                    <button className='button-image-medium'>
                        <img src={centerAlignmentImage} alt="Выравнивание по центру"/>
                    </button>

                    <button className='button-image-medium'>
                        <img src={rightAlignmentImage} alt="Выравнивание по правому краю"/>
                    </button>
                </div>
            </div>

            <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                <p>Межбуквенный интервал</p>

                <div className="flex-row-sb-c size-full-horizontal-percent">
                    <input type="range" min="0" max="3" step="0.5" value={letterSpacing} onChange={(e) => handleSliderChange(parseFloat(e.target.value), setLetterSpacing)}/>
                    <input type="number" min="0" max="3" step="0.5" value={letterSpacing} onChange={(e) => handleInputChange(parseFloat(e.target.value), setLetterSpacing, 0, 3)}/>
                </div>
            </div>

            <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                <p>Междустрочный интервал</p>

                <div className="flex-row-sb-c size-full-horizontal-percent">
                    <input type="range" min="0.5" max="2" step="0.1" value={lineSpacing} onChange={(e) => handleSliderChange(parseFloat(e.target.value), setLineSpacing)}/>
                    <input type="number" min="0.5" max="2" step="0.1" value={lineSpacing} onChange={(e) => handleInputChange(parseFloat(e.target.value), setLineSpacing, 0.5, 2)}/>
                </div>
            </div>

            <div className="flex-row-sb-c size-full-horizontal-percent">
                <div className="flex-row-sb-c flex-gap-10">
                    <p>Поворот (°)</p>
                    <input type="number" min="0" max="360" value={rotation} onChange={(e) => handleInputChange(parseInt(e.target.value), setRotation, 0, 360)}/>
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
        </div>
    );
}