import React from 'react';

import closeImage from "../assets/icons/Close.png"
import BrushSettings from './brushSettings';

function ToolSettingsPanel() {
    return (
        <div className="border-black-right background-black canvasPanel size-full-vertical-pagePercent-withHeader flex-col-top-left flex-gap-25">
            <div className='flex-row-sb-c size-full-horizontal-percent'>
                <h1>Свойства инструмента</h1>
                <button className='button-image-closePanel flex-col-c-c'>
                    <img src={closeImage} alt="Закрыть"/>
                </button>
            </div>

            <BrushSettings />
        </div>
    );
}

export default ToolSettingsPanel;