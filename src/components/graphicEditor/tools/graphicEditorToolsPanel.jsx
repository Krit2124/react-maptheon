import React from 'react';
import { useGeneralGraphicEditorStore } from 'store/store';

import cursorImage from "../../../assets/icons/Cursor.png"
import brushImage from "../../../assets/icons/Brush.png"
import objectImage from "../../../assets/icons/Object.png"
import textImage from "../../../assets/icons/Text.png"
import canvasImage from "../../../assets/icons/Canvas.png"
import downloadImage from "../../../assets/icons/Download.png"
import saveImage from "../../../assets/icons/Save.png"

export default function GraphicEditorToolsPanel() {
    const {
        currentTool,
        setCurrentTool,
        setIsToolSettingsPanelVisible,
        setIsExportRequired,
    } = useGeneralGraphicEditorStore();

    // Обработка закрытия панели с настройками
    let handleCloseToolSettingsPanel = () => {
        setIsToolSettingsPanelVisible(false)
        setCurrentTool(null)
    }
    
    // Обработка смены панели настроек
    let handleSwitchToolSettingsPannel = (newPanel) => {
        setIsToolSettingsPanelVisible(true)
        setCurrentTool(newPanel)
    }

    return (
        <div className="border-black-right background-black flex-col-sb-c canvasPanel size-full-vertical-pagePercent-withHeader">
            <div className="flex-col-sb-c flex-gap-10">
                <button className={`button-image-big ${currentTool === null ? 'active' : ''}`} onClick={handleCloseToolSettingsPanel}>
                    <img src={cursorImage} alt="Курсор"/>
                </button>

                <button className={`button-image-big ${currentTool === "Brush" ? 'active' : ''}`} onClick={() => handleSwitchToolSettingsPannel("Brush")}>
                    <img src={brushImage} alt="Кисть"/>
                </button>

                <button className={`button-image-big ${currentTool === "Object" ? 'active' : ''}`} onClick={() => handleSwitchToolSettingsPannel("Object")}>
                    <img src={objectImage} alt="Объект"/>
                </button>

                <button className={`button-image-big ${currentTool === "Label" ? 'active' : ''}`} onClick={() => handleSwitchToolSettingsPannel("Label")}>
                    <img src={textImage} alt="Подпись"/>
                </button>

                <button className={`button-image-big ${currentTool === "Canvas" ? 'active' : ''}`} onClick={() => handleSwitchToolSettingsPannel("Canvas")}>
                    <img src={canvasImage} alt="Холст"/>
                </button>
            </div>

            <div className="flex-col-sb-c flex-gap-10">
                <button className="button-image-big" onClick={() => setIsExportRequired(true)}>
                    <img src={downloadImage} alt="Скачать"/>
                </button>
                <button className="button-image-big">
                    <img src={saveImage} alt="Сохранить"/>
                </button>
            </div>
        </div>
    );
}