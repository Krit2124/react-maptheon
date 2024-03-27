import { create } from "zustand";
import { fabric } from 'fabric-all-modules';

import grassImage from "../assets/textures/grass.jpg";
import iceImage from "../assets/textures/ice.jpg";
import sandImage from "../assets/textures/sand.jpg";
import snowImage from "../assets/textures/snow.jpg";
import stoneTileImage from "../assets/textures/stoneTile.jpg";

export const useGeneralGraphicEditorStore = create((set)=> ({
    // Действия с графическим редактором
    isExportRequired: false,
    setIsExportRequired: (value) => set({ isExportRequired: value }),

    isObjectListVisible: true,
    setIsObjectListVisible: (value) => set({ isObjectListVisible: value }),

    isUndoRequired: false,
    setIsUndoRequired: (value) => set({ isUndoRequired: value }),

    isRedoRequired: false,
    setIsRedoRequired: (value) => set({ isRedoRequired: value }),

    // Настройка отображения панелей с настройками инструментов
    isToolSettingsPanelVisible: false,
    setIsToolSettingsPanelVisible: (value) => set({ isToolSettingsPanelVisible: value }),
  
    currentTool: null,
    setCurrentTool: (tool) => set({ currentTool: tool }),
}))

export const useTextureStore = create((set)=> ({
    // Список недавно использованных текстур
    recentlyUsedTextures: [
        grassImage,
        iceImage,
        sandImage,
        snowImage,
        stoneTileImage
      ],
      setRecentlyUsedTextures: (textures) => set({ recentlyUsedTextures: textures }),
}))

export const useCanvasSettingsStore = create((set)=> ({
    // Настройки холста
    canvasWidth: 800,
    setCanvasWidth: (width) => set({ canvasWidth: width }),
  
    canvasHeight: 600,
    setCanvasHeight: (height) => set({ canvasHeight: height }),
  
    isResetRequired: false,
    setIsResetRequired: (value) => set({ isResetRequired: value }),
  
    backgroundColorMode: true,
    setBackgroundColorMode: (mode) => set({ backgroundColorMode: mode }),
  
    canvasBackgroundColor: '#ffffff',
    setCanvasBackgroundColor: (color) => set({ canvasBackgroundColor: color }),
  
    currentBackgroundTexture: grassImage,
    setCurrentBackgroundTexture: (texture) => set({ currentBackgroundTexture: texture }),
  
    filtersList: [
      { name: 'Без фильтра', filter: null },
      { name: 'Черно-белый', filter: new fabric.Image.filters.Grayscale() },
      { name: 'Сепия', filter: new fabric.Image.filters.Sepia() },
    ],
  
    selectedFilter: { name: 'Без фильтра', filter: null },
    setSelectedFilter: (filter) => set({ selectedFilter: filter }),
  
    filterIntensity: 1,
    setFilterIntensity: (intensity) => set({ filterIntensity: intensity }),
}))

export const useBrushSettingsStore = create((set)=> ({
    // Настройки кисти
    brushColorMode: 'color',
    setBrushColorMode: (mode) => set({ brushColorMode: mode }),
  
    currentBrushTexture: grassImage,
    setCurrentBrushTexture: (texture) => set({ currentBrushTexture: texture }),
  
    brushColor: '#000000',
    setBrushColor: (color) => set({ brushColor: color }),
  
    currentBrushLayer: 'lower',
    setCurrentBrushLayer: (layer) => set({ currentBrushLayer: layer }),
  
    brushThickness: 20,
    setBrushThickness: (thickness) => set({ brushThickness: thickness }),
  
    brushShape: 'round',
    setBrushShape: (shape) => set({ brushShape: shape }),
  
    brushOpacity: 1,
    setBrushOpacity: (opacity) => set({ brushOpacity: opacity }),
  
    brushSoftness: 1,
    setBrushSoftness: (softness) => set({ brushSoftness: softness }),
}))