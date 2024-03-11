import React, { useState } from 'react';
import { fabric } from 'fabric';

import GraphicEditorToolsPanel from './tools/graphicEditorToolsPanel';
import ObjectListOnCanvas from './objectListOnCanvas';
import ToolSettingsPanel from './tools/toolSettingsPanel';
import CanvasComponent from './canvasComponent';

export default function GraphicEditorPage({isObjectListVisible}) {
    // Настройка отображения панелей с настройками инструментов
    const [isToolSettingsPanelVisible, setIsToolSettingsPanelVisible] = useState(false)
    const [currentTool, setCurrentTool] = useState(null);
    
    // Настройки холста
    const [canvasWidth, setCanvasWidth] = useState(800);
    const [canvasHeight, setCanvasHeight] = useState(600);
    
    const [isResetRequired, setIsResetRequired] = useState(false)
    const [canvasBackgroundColor, setCanvasBackgroundColor] = useState('#ffffff');
    const filtersList = [
        { name: 'Без фильтра', filter: null },
        { name: 'Черно-белый', filter: new fabric.Image.filters.Grayscale() },
        { name: 'Сепия', filter: new fabric.Image.filters.Sepia() },
    ];
    const [selectedFilter, setSelectedFilter] = useState(filtersList[0]);
    const [filterIntensity, setFilterIntensity] = useState(1);

    // Настройки кисти
    const [brushColor, setBrushColor] = useState('#000000');
    const [currentBrushLayer, setCurrentBrushLayer] = useState('lower')

    return (
        <section className="background-gray-default size-full-vertical-pagePercent-withHeader">
            <div className='size-full-horizontal-percent flex-row-sb-c'>
                <div className='flex-row-left-c'>
                    <GraphicEditorToolsPanel 
                        setCurrentToolSettingsPanel={setCurrentTool} 
                        setIsToolSettingsPanelVisible={setIsToolSettingsPanelVisible}
                    />

                    {isToolSettingsPanelVisible && <ToolSettingsPanel 
                        currentToolSettingsPanel={currentTool} 
                        setIsToolSettingsPanelVisible={setIsToolSettingsPanelVisible}
                        brushColor={brushColor}
                        setBrushColor={setBrushColor}
                        currentBrushLayer={currentBrushLayer}
                        setCurrentBrushLayer={setCurrentBrushLayer}
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
                    />}
                </div>

                <CanvasComponent
                    currentTool={currentTool}
                    brushColor={brushColor}
                    currentBrushLayer={currentBrushLayer}
                    canvasWidth={canvasWidth}
                    canvasHeight={canvasHeight}
                    filterIntensity={filterIntensity}
                    isResetRequired = {isResetRequired}
                    setIsResetRequired={setIsResetRequired}
                    canvasBackgroundColor={canvasBackgroundColor}
                    selectedFilter={selectedFilter}
                />

                {isObjectListVisible && <ObjectListOnCanvas/>}
            </div>
        </section>
    );
}