import React, { useState } from 'react';

import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { useGeneralGraphicEditorStore, useLabelSettingsState } from 'store/store';

import showOrHideImage from "../../../assets/icons/ShowOrHide.png"
import boldFontImage from "../../../assets/icons/BoldFont.png"
import italicFontImage from "../../../assets/icons/ItalicFont.png"
import leftAlignmentImage from "../../../assets/icons/LeftAlignment.png"
import centerAlignmentImage from "../../../assets/icons/CenterAlignment.png"
import rightAlignmentImage from "../../../assets/icons/RightAlignment.png"

export default function LabelSettings() {
    const {
        labelText, setLabelText,
        labelFontSize, setLabelFontSize,
        labelCharSpacing, setLabelCharSpacing,
        labelLineHeight, setLabelLineHeight,
        labelRotation, setLabelRotation,
        labelBorderWidth, setLabelBorderWidth,
        labelFont, setLabelFont,
        labelColor, setLabelColor,
        labelBorderColor, setLabelBorderColor,
        labelIsBold, setLabelIsBold,
        labelIsItalic, setLabelIsItalic,
        labelAlign, setLabelAlign,
        labelSelected, setLabelSelected,
        labelOpacity, setLabelOpacity,
    } = useLabelSettingsState();
    
    // Обработка изменения шрифта
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

    const [textareaValue, setTextareaValue] = useState(labelText);

    // Обработки изменения значений свойств
    const handleTextChange = (value) => {
        setLabelText(value);
        setTextareaValue(value);
    };

    return (
        <div className='flex-col-top-left flex-gap-25 size-full-horizontal-percent'>
            <div className='flex-col-sb-left flex-gap-10 size-full-horizontal-percent'>
                <p>Текст</p>
                <textarea 
                    rows={3}
                    className="textInput-usual size-full-horizontal-percent" 
                    value={textareaValue}
                    onChange={(e) => handleTextChange(e.target.value)}
                />
            </div>

            <div className="flex-row-sb-c size-full-horizontal-percent">
                <p>Шрифт</p>

                <DropdownButton className='flex-col-sb-right white-border-when-active' onToggle={handleDropdownToggle} align="end" title={
                    <span className=' button-text-usual'>
                        {labelFont}
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
                        <Dropdown.Item onClick={() => setLabelFont('Times New Roman')}>Times New Roman</Dropdown.Item>
                        <Dropdown.Item onClick={() => setLabelFont('Verdana')}>Verdana</Dropdown.Item>
                        <Dropdown.Item onClick={() => setLabelFont('Segoe UI')}>Segoe UI</Dropdown.Item>
                    </div>
                </DropdownButton>
            </div>

            <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                <p>Размер шрифта</p>

                <div className="flex-row-sb-c size-full-horizontal-percent">
                    <input type="range" min="8" max="72" value={labelFontSize} onChange={(e) => handleSliderChange(parseInt(e.target.value), setLabelFontSize)}/>
                    <input type="number" min="8" max="72" value={labelFontSize} onChange={(e) => handleInputChange(parseInt(e.target.value), setLabelFontSize, 8, 72)}/>
                </div>
            </div>

            <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                <p>Прозрачность</p>

                <div className="flex-row-sb-c size-full-horizontal-percent">
                    <input type="range" min="0" max="1" step={0.01} value={labelOpacity} onChange={(e) => handleSliderChange(parseFloat(e.target.value), setLabelOpacity)}/>
                    <input type="number" min="0" max="1" step={0.01} value={labelOpacity} onChange={(e) => handleInputChange(parseFloat(e.target.value), setLabelOpacity, 0, 1)}/>
                </div>
            </div>

            <div className="flex-row-sb-c flex-gap-15">
                <div className="flex-col-sb-left flex-gap-10">
                    <p>Цвет текста</p>
                    <p>Обводка</p>
                </div>

                <div className="flex-col-sb-left flex-gap-10">
                    <input type="color" value={labelColor} onChange={(e) => setLabelColor(e.target.value)} />
                    <div className='flex-row-sb-c flex-gap-15'>
                        <input type="color" value={labelBorderColor} onChange={(e) => setLabelBorderColor(e.target.value)} />
                        <input type="number" min="0" max="10" value={labelBorderWidth} onChange={(e) => handleInputChange(parseFloat(e.target.value), setLabelBorderWidth, 0, 10)}/>
                    </div>
                </div>
            </div>

            <div className="flex-row-sb-c size-full-horizontal-percent">
                <div className="flex-row-sb-c flex-gap-5">
                    <button className={`button-image-medium ${labelIsBold ? 'active' : ''}`} onClick={() => setLabelIsBold(!labelIsBold)} title="Жирный шрифт">
                        <img src={boldFontImage} alt="Жирный шрифт"/>
                    </button>

                    <button className={`button-image-medium ${labelIsItalic ? 'active' : ''}`} onClick={() => setLabelIsItalic(!labelIsItalic)} title="Курсивный шрифт">
                        <img src={italicFontImage} alt="Курсивный шрифт"/>
                    </button>
                </div>

                <div className="flex-row-sb-c flex-gap-5">
                    <button className={`button-image-medium ${labelAlign === 'left' ? 'active' : ''}`} onClick={() => setLabelAlign('left')} title="Выравнивание по левому краю">
                        <img src={leftAlignmentImage} alt="Выравнивание по левому краю"/>
                    </button>

                    <button className={`button-image-medium ${labelAlign === 'center' ? 'active' : ''}`} onClick={() => setLabelAlign('center')} title="Выравнивание по центру">
                        <img src={centerAlignmentImage} alt="Выравнивание по центру"/>
                    </button>

                    <button className={`button-image-medium ${labelAlign === 'right' ? 'active' : ''}`} onClick={() => setLabelAlign('right')} title="Выравнивание по правому краю">
                        <img src={rightAlignmentImage} alt="Выравнивание по правому краю"/>
                    </button>
                </div>
            </div>

            <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                <p>Межбуквенный интервал</p>

                <div className="flex-row-sb-c size-full-horizontal-percent">
                    <input type="range" min="0" max="10" step="0.1" value={labelCharSpacing} onChange={(e) => handleSliderChange(parseFloat(e.target.value), setLabelCharSpacing)}/>
                    <input type="number" min="0" max="10" step="0.1" value={labelCharSpacing} onChange={(e) => handleInputChange(parseFloat(e.target.value), setLabelCharSpacing, 0, 10)}/>
                </div>
            </div>

            <div className='flex-col-top-left flex-gap-10 size-full-horizontal-percent'>
                <p>Междустрочный интервал</p>

                <div className="flex-row-sb-c size-full-horizontal-percent">
                    <input type="range" min="0.5" max="3" step="0.1" value={labelLineHeight} onChange={(e) => handleSliderChange(parseFloat(e.target.value), setLabelLineHeight)}/>
                    <input type="number" min="0.5" max="3" step="0.1" value={labelLineHeight} onChange={(e) => handleInputChange(parseFloat(e.target.value), setLabelLineHeight, 0.5, 3)}/>
                </div>
            </div>

            <div className="flex-row-sb-c flex-gap-10">
                <p>Поворот (°)</p>
                <input type="number" min="0" max="360" value={labelRotation} onChange={(e) => handleInputChange(parseInt(e.target.value), setLabelRotation, 0, 360)}/>
            </div>
        </div>
    );
}