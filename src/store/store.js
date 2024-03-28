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
    setCurrentTool: (value) => set({ currentTool: value }),
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
      setRecentlyUsedTextures: (value) => set({ recentlyUsedTextures: value }),
}))

export const useCanvasSettingsStore = create((set)=> ({
    // Настройки холста
    canvasWidth: 800,
    setCanvasWidth: (value) => set({ canvasWidth: value }),
  
    canvasHeight: 600,
    setCanvasHeight: (value) => set({ canvasHeight: value }),
  
    isResetRequired: false,
    setIsResetRequired: (value) => set({ isResetRequired: value }),
  
    backgroundColorMode: true,
    setBackgroundColorMode: (value) => set({ backgroundColorMode: value }),
  
    canvasBackgroundColor: '#ffffff',
    setCanvasBackgroundColor: (value) => set({ canvasBackgroundColor: value }),
  
    currentBackgroundTexture: grassImage,
    setCurrentBackgroundTexture: (value) => set({ currentBackgroundTexture: value }),
  
    filtersList: [
      { name: 'Без фильтра', filter: null },
      { name: 'Черно-белый', filter: new fabric.Image.filters.Grayscale() },
      { name: 'Сепия', filter: new fabric.Image.filters.Sepia() },
    ],
  
    selectedFilter: { name: 'Без фильтра', filter: null },
    setSelectedFilter: (value) => set({ selectedFilter: value }),
  
    filterIntensity: 1,
    setFilterIntensity: (value) => set({ filterIntensity: value }),
}))

export const useBrushSettingsStore = create((set)=> ({
    // Настройки кисти
    brushColorMode: 'color',
    setBrushColorMode: (value) => set({ brushColorMode: value }),
  
    currentBrushTexture: grassImage,
    setCurrentBrushTexture: (value) => set({ currentBrushTexture: value }),
  
    brushColor: '#000000',
    setBrushColor: (value) => set({ brushColor: value }),
  
    currentBrushLayer: 'lower',
    setCurrentBrushLayer: (value) => set({ currentBrushLayer: value }),
  
    brushThickness: 20,
    setBrushThickness: (value) => set({ brushThickness: value }),
  
    brushShape: 'round',
    setBrushShape: (value) => set({ brushShape: value }),
  
    brushOpacity: 1,
    setBrushOpacity: (value) => set({ brushOpacity: value }),
  
    brushSoftness: 1,
    setBrushSoftness: (value) => set({ brushSoftness: value }),
}))

export const useLabelSettingsState = create((set) => ({
    // Настройки текста
    currentLabelValue: '',
    setCurrentLabelValue: (value) => set({ currentLabelValue: value }),

    fontSize: 20,
    setFontSize: (value) => set({ fontSize: value }),
  
    letterSpacing: 0.5,
    setLetterSpacing: (value) => set({ letterSpacing: value }),
  
    lineSpacing: 1,
    setLineSpacing: (value) => set({ lineSpacing: value }),
  
    labelRotation: 0,
    setLabelRotation: (value) => set({ labelRotation: value }),
  
    borderWidth: 0,
    setBorderWidth: (value) => set({ borderWidth: value }),

    selectedFont: 'Roboto',
    setSelectedFont: (value) => set({ selectedFont: value }),
  }));