import React, { useEffect, useState } from 'react';

import BrushSettings from './brushSettings';
import ObjectSettings from './objectSettings';
import LabelSettings from './labelSettings';
import CanvasSettings from './canvasSettings';

import closeImage from "../../../assets/icons/Close.png"

export default function ToolSettingsPanel({currentToolSettingsPanel, setIsToolSettingsPanelVisible, brushColor, setBrushColor, currentBrushLayer, setCurrentBrushLayer, canvasWidth, setCanvasWidth, canvasHeight, setCanvasHeight, filterIntensity, setFilterIntensity, isResetRequired, setIsResetRequired, canvasBackgroundColor, setCanvasBackgroundColor, selectedFilter, setSelectedFilter, filtersList}) {
    const [panelLabel, setPanelLabel] = useState("Свойства инструмента");

    let handleCloseToolSettingsPanel = () => {
        setIsToolSettingsPanelVisible(false)
    }

    // Изменение заголовка панели в зависимости от нажатой кнопки
    useEffect(() => {
        if (currentToolSettingsPanel === "Brush") {
            setPanelLabel("Свойства кисти");
        } else if (currentToolSettingsPanel === "Object") {
            setPanelLabel("Свойства объекта");
        } else if (currentToolSettingsPanel === "Label") {
            setPanelLabel("Свойства подписи");
        } else if (currentToolSettingsPanel === "Canvas") {
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
            {currentToolSettingsPanel === "Brush" ? <BrushSettings 
                brushColor={brushColor}
                setBrushColor={setBrushColor}
                currentBrushLayer={currentBrushLayer}
                setCurrentBrushLayer={setCurrentBrushLayer}
            /> 
            : currentToolSettingsPanel === "Object" ? <ObjectSettings /> 
            : currentToolSettingsPanel === "Label" ? <LabelSettings/> 
            : currentToolSettingsPanel === "Canvas" ? <CanvasSettings 
                canvasWidth={canvasWidth}
                setCanvasWidth={setCanvasWidth}
                canvasHeight={canvasHeight}
                setCanvasHeight={setCanvasHeight}
                filterIntensity={filterIntensity}
                setFilterIntensity={setFilterIntensity}
                isResetRequired = {isResetRequired}
                setIsResetRequired={setIsResetRequired}
                canvasBackgroundColor={canvasBackgroundColor}
                setCanvasBackgroundColor={setCanvasBackgroundColor}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
                filtersList={filtersList}
            />
            : null}
        </div>
    );
}