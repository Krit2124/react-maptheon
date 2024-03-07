import React, { useEffect, useState } from 'react';

import BrushSettings from './brushSettings';
import ObjectSettings from './objectSettings';
import LabelSettings from './labelSettings';
import CanvasSettings from './canvasSettings';

import closeImage from "../../../assets/icons/Close.png"

export default function ToolSettingsPanel({currentToolSettingsPanel, setIsToolSettingsPanelVisible, canvasWidth, setCanvasWidth, canvasHeight, setCanvasHeight, filterIntensity, setFilterIntensity}) {
    const [panelLabel, setPanelLabel] = useState("Свойства инструмента");

    let handleCloseToolSettingsPanel = () => {
        setIsToolSettingsPanelVisible(false)
    }

    // Изменение заголовка панели в зависимости от нажатой кнопки
    useEffect(() => {
        if (currentToolSettingsPanel === "BrushSettings") {
            setPanelLabel("Свойства кисти");
        } else if (currentToolSettingsPanel === "ObjectSettings") {
            setPanelLabel("Свойства объекта");
        } else if (currentToolSettingsPanel === "LabelSettings") {
            setPanelLabel("Свойства подписи");
        } else if (currentToolSettingsPanel === "CanvasSettings") {
            setPanelLabel("Свойства холста");
        }
    }, [currentToolSettingsPanel]);

    return (
        <div className="border-black-right background-black canvasPanel size-full-vertical-pagePercent-withHeader flex-col-top-left flex-gap-25">
            <div className='flex-row-sb-c size-full-horizontal-percent'>
                <h1>{panelLabel}</h1>

                <button className='button-image-closePanel' onClick={handleCloseToolSettingsPanel}>
                    <img src={closeImage} alt="Закрыть"/>
                </button>
            </div>

            {/* Изменение контента панели в зависимости от нажатой кнопки */}
            {currentToolSettingsPanel === "BrushSettings" ? <BrushSettings /> 
            : currentToolSettingsPanel === "ObjectSettings" ? <ObjectSettings /> 
            : currentToolSettingsPanel === "LabelSettings" ? <LabelSettings/> 
            : currentToolSettingsPanel === "CanvasSettings" ? <CanvasSettings 
                canvasWidth={canvasWidth}
                setCanvasWidth={setCanvasWidth}
                canvasHeight={canvasHeight}
                setCanvasHeight={setCanvasHeight}
                filterIntensity={filterIntensity}
                setFilterIntensity={setFilterIntensity}
            />
            : null}
        </div>
    );
}