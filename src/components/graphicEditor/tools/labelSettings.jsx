import React, { useState } from 'react';

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { useLabelSettingsState } from 'store/store';

import showOrHideImage from "../../../assets/icons/ShowOrHide.png"
import boldFontImage from "../../../assets/icons/BoldFont.png"
import italicFontImage from "../../../assets/icons/ItalicFont.png"
import leftAlignmentImage from "../../../assets/icons/LeftAlignment.png"
import centerAlignmentImage from "../../../assets/icons/CenterAlignment.png"
import rightAlignmentImage from "../../../assets/icons/RightAlignment.png"
import mirroringImage from "../../../assets/icons/Mirroring.png"


export default function LabelSettings() {
    const {
        currentLabelValue, setCurrentLabelValue,
        fontSize, setFontSize,
        letterSpacing, setLetterSpacing,
        lineSpacing, setLineSpacing,
        labelRotation, setLabelRotation,
        labelBorderWidth, setLabelBorderWidth,
        selectedFont, setSelectedFont,
        labelColor, setLabelColor,
        labelBorderColor, setLabelBorderColor,
        isLabelBold, setIsLabelBold,
        isLabelItalic, setIsLabelItalic,
        labelAlign, setLabelAlign,
        selectedTextObject, setSelectedTextObject,
    } = useLabelSettingsState();
    
    // Обработка изменения шрифта
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleFontSelect = (fontOption) => {
        setSelectedFont(fontOption);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Обработка изменения свойств шрифта
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

    const [textareaValue, setTextareaValue] = useState(currentLabelValue);

    const handleChange = (e) => {
        if (selectedTextObject != null) {
            selectedTextObject.text = e.target.value;
            setCurrentLabelValue(e.target.value);
            setTextareaValue(e.target.value);
        } else {
            setCurrentLabelValue(e.target.value);
            setTextareaValue(e.target.value);
        }
    };

    return (
        <div className='flex-col-top-left flex-gap-25 size-full-horizontal-percent'>
            <div className='flex-col-sb-left flex-gap-10 size-full-horizontal-percent'>
                <p>Текст</p>
                <textarea 
                    // @ts-ignore
                    rows="3" 
                    className="textInput-usual size-full-horizontal-percent" 
                    value={textareaValue}
                    onChange={handleChange}
                />
            </div>

            <div className="flex-row-sb-c size-full-horizontal-percent">
                <p>Шрифт</p>

                <DropdownButton className='flex-col-sb-right white-border-when-active' onToggle={handleDropdownToggle} align="end" title={
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
                        <Dropdown.Item onClick={() => handleFontSelect('Roboto')}>Roboto</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFontSelect('Verdana')}>Verdana</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleFontSelect('Times New Roman')}>Times New Roman</Dropdown.Item>
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
                    <input type="color" onChange={(e) => setLabelColor(e.target.value)} />
                    <div className='flex-row-sb-c flex-gap-15'>
                        <input type="color" onChange={(e) => setLabelBorderColor(e.target.value)} />
                        <input type="number" min="0" max="10" onChange={(e) => handleInputChange(parseFloat(e.target.value), setLabelBorderWidth, 0, 10)}/>
                    </div>
                </div>
            </div>

            <div className="flex-row-sb-c size-full-horizontal-percent">
                <div className="flex-row-sb-c flex-gap-5">
                    <button className={`button-image-medium ${isLabelBold ? 'active' : ''}`} onClick={() => setIsLabelBold(!isLabelBold)}>
                        <img src={boldFontImage} alt="Жирный шрифт"/>
                    </button>

                    <button className={`button-image-medium ${isLabelItalic ? 'active' : ''}`} onClick={() => setIsLabelItalic(!isLabelItalic)}>
                        <img src={italicFontImage} alt="Курсивный шрифт"/>
                    </button>
                </div>

                <div className="flex-row-sb-c flex-gap-5">
                    <button className={`button-image-medium ${labelAlign === 'left' ? 'active' : ''}`} onClick={() => setLabelAlign('left')}>
                        <img src={leftAlignmentImage} alt="Выравнивание по левому краю"/>
                    </button>

                    <button className={`button-image-medium ${labelAlign === 'center' ? 'active' : ''}`} onClick={() => setLabelAlign('center')}>
                        <img src={centerAlignmentImage} alt="Выравнивание по центру"/>
                    </button>

                    <button className={`button-image-medium ${labelAlign === 'right' ? 'active' : ''}`} onClick={() => setLabelAlign('right')}>
                        <img src={rightAlignmentImage} alt="Выравнивание по правому краю"/>
                    </button>
                </div>
            </div>

            <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                <p>Межбуквенный интервал</p>

                <div className="flex-row-sb-c size-full-horizontal-percent">
                    <input type="range" min="0" max="10" step="0.5" value={letterSpacing} onChange={(e) => handleSliderChange(parseFloat(e.target.value), setLetterSpacing)}/>
                    <input type="number" min="0" max="10" step="0.5" value={letterSpacing} onChange={(e) => handleInputChange(parseFloat(e.target.value), setLetterSpacing, 0, 10)}/>
                </div>
            </div>

            <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                <p>Междустрочный интервал</p>

                <div className="flex-row-sb-c size-full-horizontal-percent">
                    <input type="range" min="0.5" max="3" step="0.1" value={lineSpacing} onChange={(e) => handleSliderChange(parseFloat(e.target.value), setLineSpacing)}/>
                    <input type="number" min="0.5" max="3" step="0.1" value={lineSpacing} onChange={(e) => handleInputChange(parseFloat(e.target.value), setLineSpacing, 0.5, 3)}/>
                </div>
            </div>

            <div className="flex-row-sb-c flex-gap-10">
                <p>Поворот (°)</p>
                <input type="number" min="0" max="360" value={labelRotation} onChange={(e) => handleInputChange(parseInt(e.target.value), setLabelRotation, 0, 360)}/>
            </div>
        </div>
    );
}