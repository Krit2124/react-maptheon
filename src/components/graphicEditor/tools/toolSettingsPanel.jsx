import React from 'react';

import BrushSettings from './brushSettings';
import LabelSettings from './labelSettings';
import CanvasSettings from './canvasSettings';
import ObjectSettings from './objectSettings';

import closeImage from "../../../assets/icons/Close.png"

export default function ToolSettingsPanel() {
    return (
        <div className="border-black-right background-black canvasPanel size-full-vertical-pagePercent-withHeader flex-col-top-left flex-gap-25">
            <div className='flex-row-sb-c size-full-horizontal-percent'>
                <h1>Свойства инструмента</h1>
                <button className='button-image-closePanel'>
                    <img src={closeImage} alt="Закрыть"/>
                </button>
            </div>

            <ObjectSettings />
        </div>
    );
}