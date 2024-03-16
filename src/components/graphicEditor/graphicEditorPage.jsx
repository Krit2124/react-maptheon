import React, { useState } from 'react';
import { fabric } from 'fabric';

import GraphicEditorToolsPanel from './tools/graphicEditorToolsPanel';
import ObjectListOnCanvas from './objectListOnCanvas';
import ToolSettingsPanel from './tools/toolSettingsPanel';
import CanvasComponent from './canvasComponent';
import CanvasComponentTest from './canvasComponentTest';

import grassImage from "../../assets/textures/grass.jpg";
import iceImage from "../../assets/textures/ice.jpg";
import sandImage from "../../assets/textures/sand.jpg";
import snowImage from "../../assets/textures/snow.jpg";
import stoneTileImage from "../../assets/textures/stoneTile.jpg";

export default function GraphicEditorPage({isObjectListVisible}) {
    // Настройка отображения панелей с настройками инструментов
    const [isToolSettingsPanelVisible, setIsToolSettingsPanelVisible] = useState(false)
    const [currentTool, setCurrentTool] = useState(null);
    
    // Список недавно использованных текстур
    const [recentlyUsedTextures, setRecentlyUsedTextures] = useState([
        grassImage,
        iceImage,
        sandImage,
        snowImage,
        stoneTileImage
    ]);

    // Настройки холста
    const [canvasWidth, setCanvasWidth] = useState(800); // ширина
    const [canvasHeight, setCanvasHeight] = useState(600); // высота
    const [isResetRequired, setIsResetRequired] = useState(false); // нужен ли сброс масштабирования
    const [backgroundColorMode, setBackgroundColorMode] = useState(true); // true - на фоне цвет, false - на фоне текстура
    const [canvasBackgroundColor, setCanvasBackgroundColor] = useState('#ffffff'); // цвет фона
    const [currentBackgroundTexture, setCurrentBackgroundTexture] = useState(recentlyUsedTextures[0]); // текущая выбранная текстура
    const filtersList = [
        { name: 'Без фильтра', filter: null },
        { name: 'Черно-белый', filter: new fabric.Image.filters.Grayscale() },
        { name: 'Сепия', filter: new fabric.Image.filters.Sepia() },
    ]; // список фильтров
    const [selectedFilter, setSelectedFilter] = useState(filtersList[0]); // выбранный фильтр
    const [filterIntensity, setFilterIntensity] = useState(1); // интенсивность фильтра

    // Настройки кисти
    const [brushColorMode, setBrushColorMode] = useState(true); // true - режим выбора цвета, false - режим выбора текстуры
    const [currentBrushTexture, setCurrentBrushTexture] = useState(recentlyUsedTextures[0]); // текущая выбранная текстура
    const [brushColor, setBrushColor] = useState('#000000'); // цвет кисти
    const [currentBrushLayer, setCurrentBrushLayer] = useState('lower'); // выбранный слой для рисования
    const [brushThickness, setBrushThickness] = useState(20); // толщина кисти
    const [brushOpacity, setBrushOpacity] = useState(1); // прозрачность кисти
    const [brushSoftness, setBrushtSoftness] = useState(1); // мягкость кисти

    return (
        <section className="background-gray-default size-full-vertical-pagePercent-withHeader">
            <div className='size-full-horizontal-percent flex-row-sb-c'>
                <div className='flex-row-left-c'>
                    <GraphicEditorToolsPanel 
                        currentToolSettingsPanel={currentTool} 
                        setCurrentToolSettingsPanel={setCurrentTool} 
                        isToolSettingsPanelVisible={isToolSettingsPanelVisible}
                        setIsToolSettingsPanelVisible={setIsToolSettingsPanelVisible}
                    />

                    {isToolSettingsPanelVisible && <ToolSettingsPanel 
                        currentToolSettingsPanel={currentTool} 
                        setIsToolSettingsPanelVisible={setIsToolSettingsPanelVisible}

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

                        canvasWidth={canvasWidth}
                        setCanvasWidth={setCanvasWidth}
                        canvasHeight={canvasHeight}
                        setCanvasHeight={setCanvasHeight}
                        filterIntensity={filterIntensity}
                        setFilterIntensity={setFilterIntensity}
                        isResetRequired={isResetRequired}
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
                    />}
                </div>

                {/* <CanvasComponent
                    currentTool={currentTool}

                    brushColor={brushColor}
                    currentBrushLayer={currentBrushLayer}
                    brushThickness={brushThickness}
                    brushOpacity={brushOpacity}
                    brushSoftness={brushSoftness}

                    canvasWidth={canvasWidth}
                    canvasHeight={canvasHeight}
                    filterIntensity={filterIntensity}
                    isResetRequired = {isResetRequired}
                    setIsResetRequired={setIsResetRequired}
                    canvasBackgroundColor={canvasBackgroundColor}
                    selectedFilter={selectedFilter}
                /> */}

                <CanvasComponentTest
                    currentTool={currentTool}

                    recentlyUsedTextures={recentlyUsedTextures}

                    brushColorMode={brushColorMode}
                    currentBrushTexture={currentBrushTexture}
                    brushColor={brushColor}
                    currentBrushLayer={currentBrushLayer}
                    brushThickness={brushThickness}
                    brushOpacity={brushOpacity}
                    brushSoftness={brushSoftness}

                    canvasWidth={canvasWidth}
                    canvasHeight={canvasHeight}
                    filterIntensity={filterIntensity}
                    isResetRequired = {isResetRequired}
                    setIsResetRequired={setIsResetRequired}
                    backgroundColorMode={backgroundColorMode}
                    currentBackgroundTexture={currentBackgroundTexture}
                    canvasBackgroundColor={canvasBackgroundColor}
                    selectedFilter={selectedFilter}
                />

                {isObjectListVisible && <ObjectListOnCanvas/>}
            </div>
        </section>
    );
}