import React, { useState } from 'react';

import GraphicEditorToolsPanel from './tools/graphicEditorToolsPanel';
import ObjectListOnCanvas from './objectListOnCanvas';
import ToolSettingsPanel from './tools/toolSettingsPanel';
import CanvasComponent from './canvasComponent';

export default function GraphicEditorPage({isObjectListVisible}) {
    // Настройка отображения панелей с настройками инструментов
    const [isToolSettingsPanelVisible, setIsToolSettingsPanelVisible] = useState(false)
    const [currentToolSettingsPanel, setCurrentToolSettingsPanel] = useState(null);
    
    // Настройки холста
    const [canvasWidth, setCanvasWidth] = useState(800);
    const [canvasHeight, setCanvasHeight] = useState(600);
    const [filterIntensity, setFilterIntensity] = useState(1);
    const [isResetRequired, setIsResetRequired] = useState(false)

    return (
        <section className="background-gray-default size-full-vertical-pagePercent-withHeader">
            <div className='size-full-horizontal-percent flex-row-sb-c'>
                <div className='flex-row-left-c'>
                    <GraphicEditorToolsPanel 
                        setCurrentToolSettingsPanel={setCurrentToolSettingsPanel} 
                        setIsToolSettingsPanelVisible={setIsToolSettingsPanelVisible}
                    />

                    {isToolSettingsPanelVisible && <ToolSettingsPanel 
                        currentToolSettingsPanel={currentToolSettingsPanel} 
                        setIsToolSettingsPanelVisible={setIsToolSettingsPanelVisible}
                        canvasWidth={canvasWidth}
                        setCanvasWidth={setCanvasWidth}
                        canvasHeight={canvasHeight}
                        setCanvasHeight={setCanvasHeight}
                        filterIntensity={filterIntensity}
                        setFilterIntensity={setFilterIntensity}
                        isResetRequired = {isResetRequired}
                        setIsResetRequired={setIsResetRequired}
                    />}
                </div>

                <CanvasComponent
                    canvasWidth={canvasWidth}
                    canvasHeight={canvasHeight}
                    filterIntensity={filterIntensity}
                    isResetRequired = {isResetRequired}
                    setIsResetRequired={setIsResetRequired}
                />

                {isObjectListVisible && <ObjectListOnCanvas/>}
            </div>
        </section>
    );
}