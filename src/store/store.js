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

    typeOfChoosenObject: null,
    setTypeOfChoosenObject: (value) => set({ typeOfChoosenObject: value }),
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
  
    canvasBackgroundIsColorMode: true,
    setCanvasBackgroundIsColorMode: (value) => set({ canvasBackgroundIsColorMode: value }),
  
    canvasBackgroundColor: '#ffffff',
    setCanvasBackgroundColor: (value) => set({ canvasBackgroundColor: value }),
  
    canvasBackgroundTexture: grassImage,
    setCanvasBackgroundTexture: (value) => set({ canvasBackgroundTexture: value }),
  
    filtersList: [
      { name: 'Без фильтра', filter: null },
      { name: 'Черно-белый', filter: new fabric.Image.filters.Grayscale() },
      { name: 'Сепия', filter: new fabric.Image.filters.Sepia() },
    ],
  
    filterSelected: { name: 'Без фильтра', filter: null },
    setFilterSelected: (value) => set({ filterSelected: value }),
  
    filterIntensity: 1,
    setFilterIntensity: (value) => set({ filterIntensity: value }),
}))

export const useBrushSettingsStore = create((set)=> ({
    // Настройки кисти
    brushColorMode: 'color',
    setBrushColorMode: (value) => set({ brushColorMode: value }),
  
    brushTexture: grassImage,
    setBrushTexture: (value) => set({ brushTexture: value }),
  
    brushColor: '#000000',
    setBrushColor: (value) => set({ brushColor: value }),
  
    brushCurrentLayer: 'lower',
    setBrushCurrentLayer: (value) => set({ brushCurrentLayer: value }),
  
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
    labelText: '',
    setLabelText: (value) => set({ labelText: value }),

    labelFontSize: 20,
    setLabelFontSize: (value) => set({ labelFontSize: value }),
  
    labelCharSpacing: 0.5,
    setLabelCharSpacing: (value) => set({ labelCharSpacing: value }),
  
    labelLineHeight: 1,
    setLabelLineHeight: (value) => set({ labelLineHeight: value }),
  
    labelRotation: 0,
    setLabelRotation: (value) => set({ labelRotation: value }),
  
    labelBorderWidth: 0,
    setLabelBorderWidth: (value) => set({ labelBorderWidth: value }),

    labelFont: 'Times New Roman',
    setLabelFont: (value) => set({ labelFont: value }),

    labelColor: '#000000',
    setLabelColor: (value) => set({ labelColor: value }),

    labelBorderColor: '#000000',
    setLabelBorderColor: (value) => set({ labelBorderColor: value }),

    labelIsBold: false,
    setLabelIsBold: (value) => set({ labelIsBold: value }),

    labelIsItalic: false,
    setLabelIsItalic: (value) => set({ labelIsItalic: value }),

    labelAlign: 'left',
    setLabelAlign: (value) => set({ labelAlign: value }),

    labelSelected: null,
    setLabelSelected: (value) => set({ labelSelected: value }),
}));

export const useObjectSettingsState = create((set) => ({
    objectSize: 100,
    setObjectSize: (value) => set({ objectSize: value }),

    objectOpacity: 1,
    setObjectOpacity: (value) => set({ objectOpacity: value }),

    objectRotation: 0,
    setObjectRotation: (value) => set({ objectRotation: value }),

    objectSaturation: 0.1,
    setObjectSaturation: (value) => set({ objectSaturation: value }),

    objectBrightness: 0,
    setObjectBrightness: (value) => set({ objectBrightness: value }),

    objectContrast: 0,
    setObjectContrast: (value) => set({ objectContrast: value }),

    objectIsUseRandom: true,
    setObjectIsUseRandom: (value) => set({ objectIsUseRandom: value }),

    objectIsHorizontalMirrored: false,
    setObjectIsHorizontalMirrored: (value) => set({ objectIsHorizontalMirrored: value }),

    objectIsVerticalMirrored: false,
    setObjectIsVerticalMirrored: (value) => set({ objectIsVerticalMirrored: value }),
}));