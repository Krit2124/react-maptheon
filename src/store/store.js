import { create } from "zustand";
import { fabric } from 'fabric-all-modules';
import axios from 'axios';

import AuthService from '../services/AuthService';
import MapService from "services/MapService";
import { API_URL } from '../http';

import grassImage from "../assets/textures/grass.jpg";
import iceImage from "../assets/textures/ice.jpg";
import sandImage from "../assets/textures/sand.jpg";
import snowImage from "../assets/textures/snow.jpg";
import stoneTileImage from "../assets/textures/stoneTile.jpg";

import rock1Image from "../assets/objects/rock1.png";
import rock2Image from "../assets/objects/rock2.png";
import rock3Image from "../assets/objects/rock3.png";
import rock4Image from "../assets/objects/rock4.png";
import rock5Image from "../assets/objects/rock5.png";
import rock6Image from "../assets/objects/rock6.png";
import rock7Image from "../assets/objects/rock7.png";
import rock8Image from "../assets/objects/rock8.png";
import rock9Image from "../assets/objects/rock9.png";
import rock10Image from "../assets/objects/rock10.png";
import rock11Image from "../assets/objects/rock11.png";
import rock12Image from "../assets/objects/rock12.png";
import rock13Image from "../assets/objects/rock13.png";
import rock14Image from "../assets/objects/rock14.png";
import rock15Image from "../assets/objects/rock15.png";
import rock16Image from "../assets/objects/rock16.png";
import rock17Image from "../assets/objects/rock17.png";

import tree1Image from "../assets/objects/tree1.png";
import tree2Image from "../assets/objects/tree2.png";
import tree3Image from "../assets/objects/tree3.png";

export const useGeneralGraphicEditorStore = create((set)=> ({
    // Действия с графическим редактором
    isExportRequired: false,
    setIsExportRequired: (value) => set({ isExportRequired: value }),

    isSaveRequired: false,
    setIsSaveRequired: (value) => set({ isSaveRequired: value }),

    isObjectListVisible: true,
    setIsObjectListVisible: (value) => set({ isObjectListVisible: value }),

    // Требуется ли отмена последнего действия
    isUndoRequired: false,
    setIsUndoRequired: (value) => set({ isUndoRequired: value }),

    // Требуется ли возврат последнего действия
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

export const useObjectsStore = create((set)=> ({
    // Список недавно использованных текстур
    recentlyUsedObjects: [
        [
            rock1Image,
            rock2Image,
            rock3Image,
            rock4Image,
            rock5Image,
            rock6Image,
            rock7Image,
            rock8Image,
            rock9Image,
            rock10Image,
            rock11Image,
            rock12Image,
            rock13Image,
            rock14Image,
            rock15Image,
            rock16Image,
            rock17Image,
        ],
        [
            tree1Image,
            tree2Image,
            tree3Image,
        ],
      ],
      setRecentlyUsedObjects: (value) => set({ recentlyUsedObjects: value }),
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
    // Настройки подписи
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

    labelOpacity: 1,
    setLabelOpacity: (value) => set({ labelOpacity: value }),

    labelSelected: null,
    setLabelSelected: (value) => set({ labelSelected: value }),
}));

export const useObjectSettingsState = create((set) => ({
    objectIsUseRandom: true,
    setObjectIsUseRandom: (value) => set({ objectIsUseRandom: value }),

    // Настройки объекта
    objectSize: 50,
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

    objectIsHorizontalMirrored: false,
    setObjectIsHorizontalMirrored: (value) => set({ objectIsHorizontalMirrored: value }),

    objectIsVerticalMirrored: false,
    setObjectIsVerticalMirrored: (value) => set({ objectIsVerticalMirrored: value }),

    objectSelected: null,
    setObjectSelected: (value) => set({ objectSelected: value }),
}));

export const useUserStore = create((set) => ({
    user: {},
    isAuth: false,
    isLoading: false,

    login: async (emailOrUsername, password) => {
        try {
            const response = await AuthService.login(emailOrUsername, password);
            localStorage.setItem('token', response.data.accessToken);
            set({ isAuth: true, user: response.data.user });
            return {
                isSuccess: true,
                message: 'Авторизация прошла успешно',
            };
        } catch (e) {
            console.log(e.response?.data?.message);
            return {
                isSuccess: false,
                message: e.response.data.message,
            };;
        }
    },

    registration: async (username, email, password) => {
        try {
            const response = await AuthService.registration(username,email, password);
            localStorage.setItem('token', response.data.accessToken);
            set({ isAuth: true, user: response.data.user });
            return {
                isSuccess: true,
                message: 'Регистрация прошла успешно',
            };
        } catch (e) {
            console.log(e.response?.data?.message);
            return {
                isSuccess: false,
                message: e.response.data.message,
            };
        }
    },

    logout: async () => {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            set({ isAuth: false, user: {} });
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    },

    checkAuth: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get(`${API_URL}/refresh`, { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            set({ isAuth: true, user: response.data.user });
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            set({ isLoading: false });
        }
    },
}));

export const useServerMapOperationsStore = create((set)=> ({
    // Функция получения списка карт текущего пользователя
    // Получаемые поля: id, name, is_public, updatedAt, imagePath
    myMaps: async (id_user) => {
        try {
            const maps = await MapService.myMaps(id_user);
            return maps;
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    },

    // Функция получения данных карты для продолжения работы с ней
    // Получаемые поля: data (в формате JSON)
    myMapData: async (id_map) => {
        try {
            const mapData = await MapService.myMapData(id_map);
            return mapData;
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    },
}))