import React, { useEffect, useState } from 'react';

import BrushSettings from './brushSettings';
import ObjectSettings from './objectSettings';
import LabelSettings from './labelSettings';
import CanvasSettings from './canvasSettings';

import closeImage from "../../../assets/icons/Close.png"

export default function ToolSettingsPanel({
    currentToolSettingsPanel, setIsToolSettingsPanelVisible, 

    recentlyUsedTextures, setRecentlyUsedTextures,

    brushColorMode, setBrushColorMode, currentBrushTexture, setCurrentBrushTexture, brushColor, setBrushColor, currentBrushLayer, setCurrentBrushLayer, brushThickness, setBrushThickness, brushOpacity, setBrushOpacity, brushSoftness, setBrushtSoftness,

    canvasWidth, setCanvasWidth, canvasHeight, setCanvasHeight, filterIntensity, setFilterIntensity, isResetRequired, setIsResetRequired, backgroundColorMode, setBackgroundColorMode, currentBackgroundTexture, setCurrentBackgroundTexture, canvasBackgroundColor, setCanvasBackgroundColor, selectedFilter, setSelectedFilter, filtersList}) {

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
                recentlyUsedTextures={recentlyUsedTextures}
                setRecentlyUsedTextures={setRecentlyUsedTextures}

                brushColorMode={brushColorMode}
                setBrushColorMode={setBrushColorMode}
                currentBrushTexture={currentBrushTexture}
                setCurrentBrushTexture={setCurrentBrushTexture}
                brushColor={brushColor}
                setBrushColor={setBrushColor}
                currentBrushLayer={currentBrushLayer}
                setCurrentBrushLayer={setCurrentBrushLayer}
                brushThickness={brushThickness}
                setBrushThickness={setBrushThickness}
                brushOpacity={brushOpacity}
                setBrushOpacity={setBrushOpacity}
                brushSoftness={brushSoftness}
                setBrushtSoftness={setBrushtSoftness}
            /> 
            : currentToolSettingsPanel === "Object" ? <ObjectSettings /> 
            : currentToolSettingsPanel === "Label" ? <LabelSettings/> 
            : currentToolSettingsPanel === "Canvas" ? <CanvasSettings 
                recentlyUsedTextures={recentlyUsedTextures}
                setRecentlyUsedTextures={setRecentlyUsedTextures}

                canvasWidth={canvasWidth}
                setCanvasWidth={setCanvasWidth}
                canvasHeight={canvasHeight}
                setCanvasHeight={setCanvasHeight}
                filterIntensity={filterIntensity}
                setFilterIntensity={setFilterIntensity}
                isResetRequired = {isResetRequired}
                setIsResetRequired={setIsResetRequired}
                backgroundColorMode={backgroundColorMode}
                setBackgroundColorMode={setBackgroundColorMode}
                currentBackgroundTexture={currentBackgroundTexture}
                setCurrentBackgroundTexture={setCurrentBackgroundTexture}
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