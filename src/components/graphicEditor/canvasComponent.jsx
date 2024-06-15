import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric-all-modules';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import { useBrushSettingsStore, useCanvasSettingsStore, useGeneralGraphicEditorStore, useLabelSettingsState, useObjectSettingsState, useObjectsStore, useServerMapOperationsStore } from 'store/store';

export default function CanvasComponent() {
  const { id_map } = useParams();
  const navigate = useNavigate();

  const {
    currentTool, setCurrentTool,
    isExportRequired, setIsExportRequired,
    isSaveRequired, setIsSaveRequired,
    isUndoRequired, setIsUndoRequired,
    isRedoRequired, setIsRedoRequired,
    setIsToolSettingsPanelVisible,
    typeOfChoosenObject, setTypeOfChoosenObject,
  } = useGeneralGraphicEditorStore();
  
  const {
    brushColorMode,
    brushTexture,
    brushColor,
    brushCurrentLayer,
    brushThickness,
    brushShape,
    brushOpacity,
    brushSoftness,
  } = useBrushSettingsStore();

  const {
    canvasWidth, setCanvasWidth,
    canvasHeight, setCanvasHeight,
    filterIntensity,
    isResetRequired, setIsResetRequired,
    canvasBackgroundIsColorMode, setCanvasBackgroundIsColorMode,
    canvasBackgroundTexture, setCanvasBackgroundTexture,
    canvasBackgroundColor, setCanvasBackgroundColor,
    filterSelected,
  } = useCanvasSettingsStore();

  const {
    labelText, setLabelText,
    labelFontSize, setLabelFontSize,
    labelCharSpacing, setLabelCharSpacing,
    labelLineHeight, setLabelLineHeight,
    labelRotation, setLabelRotation,
    labelBorderWidth, setLabelBorderWidth,
    labelFont, setLabelFont,
    labelColor, setLabelColor,
    labelBorderColor, setLabelBorderColor,
    labelIsBold, setLabelIsBold,
    labelIsItalic, setLabelIsItalic,
    labelAlign, setLabelAlign,
    labelOpacity, setLabelOpacity,
    labelSelected, setLabelSelected,
  } = useLabelSettingsState();

  const {
    objectSize, setObjectSize,
    objectOpacity, setObjectOpacity,
    objectRotation, setObjectRotation,
    objectSaturation, setObjectSaturation,
    objectBrightness, setObjectBrightness,
    objectContrast, setObjectContrast,
    objectIsUseRandom, setObjectIsUseRandom,
    objectIsHorizontalMirrored, setObjectIsHorizontalMirrored,
    objectIsVerticalMirrored, setObjectIsVerticalMirrored,
    objectSelected, setObjectSelected,
  } = useObjectSettingsState();

  const {
    recentlyUsedObjects, setRecentlyUsedObjects,
  } = useObjectsStore();

  const {
    myMapData,
    saveMapData,
  } = useServerMapOperationsStore();

  // Холсты и рабочая область
  const lowerCanvasRef = useRef(null);
  const middleCanvasRef = useRef(null);
  const upperCanvasRef = useRef(null);
  const workingAreaRef = useRef(null);

  // Нужно для корректной работы событий холстов
  const brushCurrentLayerRef = useRef(brushCurrentLayer);
  const brushOpacityRef = useRef(brushOpacity);
  const brushColorModeRef = useRef(brushColorMode);

  useEffect(() => {
    brushCurrentLayerRef.current = brushCurrentLayer;

    // Рисование при выборе кисти
    const handleMouseDown = (event) => {
      if (event.button === 0) {
        if (currentTool === "Brush") {
          if (brushCurrentLayerRef.current === 'upper') {
            upperCanvasRef.current.isDrawingMode = true;
            upperCanvasRef.current.freeDrawingBrush.onMouseDown(event);
          } else if (brushCurrentLayerRef.current === 'lower') {
            lowerCanvasRef.current.isDrawingMode = true;
            lowerCanvasRef.current.freeDrawingBrush.onMouseDown(event);
          }
        }
      }
    };
  
    const handleMouseMove = (event) => {
      if (event.button === 0) {
        if (currentTool === "Brush") {
          (brushCurrentLayerRef.current === 'upper' ? upperCanvasRef.current : lowerCanvasRef.current).freeDrawingBrush.onMouseMove(event);
        }
      }
    };
    
    const handleMouseUp = () => {
      if (currentTool === "Brush") {
        if (brushCurrentLayerRef.current === 'upper') {
          upperCanvasRef.current.isDrawingMode = false;
          upperCanvasRef.current.freeDrawingBrush.onMouseUp();
        } else if (brushCurrentLayerRef.current === 'lower') {
          lowerCanvasRef.current.isDrawingMode = false;
          lowerCanvasRef.current.freeDrawingBrush.onMouseUp();
        }
      }
    };
    
    // Создание нижнего холста
    if (lowerCanvasRef.current == null) {
      const lowerCanvas = new fabric.Canvas('lowerCanvas', {
        width: window.screen.width,
        height: window.screen.height,
        containerClass: 'canvas-lower-container',
      });

      // Создание рабочей области
      const workingArea = new fabric.Rect({
        left: (window.screen.width - canvasWidth) / 2,
        top: (window.screen.height - canvasHeight) / 2,
        width: canvasWidth,
        height: canvasHeight,
        fill: canvasBackgroundColor,
        selectable: false,
        evented: false,
        erasable: false,
      });

      workingAreaRef.current = workingArea;

      lowerCanvas.add(workingArea);

      let lowerContainer = document.querySelector('.canvas-lower-container');
      // @ts-ignore
      lowerContainer.style.position = 'absolute';
      // @ts-ignore
      lowerContainer.style.width = '100%';
      // @ts-ignore
      lowerContainer.style.height = '100%';

      lowerCanvasRef.current = lowerCanvas;

      // Присваивание событий для рисования
      lowerCanvasRef.current.on('mouse:down', handleMouseDown);
      lowerCanvasRef.current.on('mouse:move', handleMouseMove);
      lowerCanvasRef.current.on('mouse:up', () => {
        handleMouseUp();
        // Добавление прозрачности текстурной кисти
        if (brushColorModeRef.current === 'texture') {
          let lastDrawnObject = lowerCanvasRef.current.getObjects().pop();
          lastDrawnObject.set('opacity', brushOpacityRef.current);
        }
      });
    } else {
      workingAreaRef.current.set({
        width: canvasWidth,
        height: canvasHeight,
      });

      // Установка цвета фона или текстуры фона для рабочей области
      if (canvasBackgroundIsColorMode) {
        workingAreaRef.current.set('fill', canvasBackgroundColor);
      } else {
        fabric.util.loadImage(canvasBackgroundTexture, function(img) {
          const texture = new fabric.Pattern({
            source: img,
            repeat: 'repeat'
          });
          workingAreaRef.current.set('fill', texture);
          lowerCanvasRef.current.renderAll();
        });
      }

      lowerCanvasRef.current.renderAll();
    }

    // Обработка добавления подписи и объектов на холст
    const handleCanvasClick = (event) => {
      //Получение координат курсора
      var coords = middleCanvasRef.current.getPointer(event);

      // Подпись
      if (currentTool === 'Label' && labelText !== '') {
        const text = new fabric.IText(labelText, {
          left: coords.x,
          top: coords.y,
          fill: labelColor,
          opacity: labelOpacity,
          fontSize: labelFontSize,
          fontFamily: labelFont,
          angle: labelRotation,
          stroke: labelBorderColor,
          strokeWidth: labelBorderWidth,
          fontWeight: labelIsBold ? 'bold' : 'normal',
          fontStyle: labelIsItalic ? 'italic' : 'normal',
          textAlign: labelAlign,
          charSpacing: labelCharSpacing * 500,
          lineHeight: labelLineHeight,
        });
    
        middleCanvasRef.current.add(text);
        middleCanvasRef.current.renderAll();
      }

      // Объект
      if (currentTool === 'Object') {
        let imageUrl;
    
        if (objectIsUseRandom) {
          const randomIndex = Math.floor(Math.random() * Object.keys(recentlyUsedObjects[0]).length)
            imageUrl = recentlyUsedObjects[0][randomIndex];
        } else {
            imageUrl = recentlyUsedObjects[0][0];
        }

        fabric.Image.fromURL(imageUrl, (img) => {
          const image = new fabric.Image(img.getElement(), {
            left: coords.x,
            top: coords.y,
            width: img.originalWidth,
            height: img.originalHeight,
            opacity: objectOpacity,
            angle: objectRotation,
            scaleX: objectSize / 100,
            scaleY: objectSize / 100,
            flipX: objectIsHorizontalMirrored,
            flipY: objectIsVerticalMirrored,
            filters: [
              new fabric.Image.filters.Saturation({ saturation: objectSaturation }),
              new fabric.Image.filters.Brightness({ brightness: objectBrightness }),
              new fabric.Image.filters.Contrast({ contrast: objectContrast }),
            ],
          });
  
          middleCanvasRef.current.add(image);
          middleCanvasRef.current.renderAll();
        });
      }
    };

    // Обработка выбора одиночного объекта
    const handleCanvasObjectSelected = (event) => {
      const selectedObjects = event.selected;

      if (selectedObjects && selectedObjects.length === 1) {
        const selectedObject = selectedObjects[0];

        // Сохранение параметров выбранной подписи
        if (selectedObject.type === 'i-text') {
          setCurrentTool(null);
          setIsToolSettingsPanelVisible(true);
          setTypeOfChoosenObject('Label');
          
          setLabelText(selectedObject.text);
          setLabelFontSize(selectedObject.fontSize);
          setLabelCharSpacing(selectedObject.charSpacing / 500);
          setLabelLineHeight(selectedObject.lineHeight);
          setLabelRotation(selectedObject.angle);
          setLabelBorderWidth(selectedObject.strokeWidth);
          setLabelFont(selectedObject.fontFamily);
          setLabelColor(selectedObject.fill);
          setLabelBorderColor(selectedObject.stroke);
          setLabelIsBold(selectedObject.fontWeight === "bold");
          setLabelIsItalic(selectedObject.fontStyle === "italic");
          setLabelAlign(selectedObject.textAlign);
          setLabelOpacity(selectedObject.opacity);

          setLabelSelected(selectedObject);
        }

        // Сохранение параметров выбранного объекта
        if (selectedObject.type === 'image') {
          setCurrentTool(null);
          setIsToolSettingsPanelVisible(true);
          setTypeOfChoosenObject('Object');
          
          setObjectSize(selectedObject.scaleX * 100);
          setObjectOpacity(selectedObject.opacity);
          setObjectRotation(selectedObject.angle);
          setObjectSaturation(selectedObject.filters[0].saturation);
          setObjectBrightness(selectedObject.filters[1].brightness);
          setObjectContrast(selectedObject.filters[2].contrast);
          setObjectIsHorizontalMirrored(selectedObject.flipX);
          setObjectIsVerticalMirrored(selectedObject.flipY);

          setObjectSelected(selectedObject);
        }
      }
    };

    // Обработка снятия выбора 
    const handleCanvasObjectCleared = (event) => {
      if (currentTool === null) {
        setLabelSelected(null);
        setObjectSelected(null);
        setIsToolSettingsPanelVisible(false);
        setTypeOfChoosenObject(null);
      }
    };

    // Изменение свойств выбранного объекта
    if (typeOfChoosenObject === 'Object') {
      objectSelected.set({
        opacity: objectOpacity,
        angle: objectRotation,
        scaleX: objectSize / 100,
        scaleY: objectSize / 100,
        flipX: objectIsHorizontalMirrored,
        flipY: objectIsVerticalMirrored,
      });
      objectSelected.filters[0].saturation = objectSaturation;
      objectSelected.filters[1].brightness = objectBrightness;
      objectSelected.filters[2].contrast = objectContrast;

      // Применение фильтров
      objectSelected.applyFilters();
    } else if (typeOfChoosenObject === 'Label') {
      labelSelected.set({
        text: labelText,
        fill: labelColor,
        fontSize: labelFontSize,
        fontFamily: labelFont,
        angle: labelRotation,
        stroke: labelBorderColor,
        strokeWidth: labelBorderWidth,
        fontWeight: labelIsBold ? 'bold' : 'normal',
        fontStyle: labelIsItalic ? 'italic' : 'normal',
        textAlign: labelAlign,
        charSpacing: labelCharSpacing * 500,
        lineHeight: labelLineHeight,
        opacity: labelOpacity,
      })
    }

    // Удаление выбранного объекта
    const handleKeyDown = (event) => {
      if ((event.key === 'Delete' || event.key === 'Backspace') && event.shiftKey) {
        // Получаем выбранные объекты
        const activeObjects = middleCanvasRef.current.getActiveObjects();
        
        // Проверяем, выбраны ли объекты
        if (activeObjects && activeObjects.length > 0) {
          // Удаляем выбранные объекты с холста
          activeObjects.forEach(obj => {
            middleCanvasRef.current.remove(obj);
          });
    
          // Сбрасываем активное выделение
          middleCanvasRef.current.discardActiveObject().renderAll();
        }
      }
    };
    // Присвоение события удаления объекта
    document.addEventListener('keydown', handleKeyDown);

    // Создание среднего холста
    if (middleCanvasRef.current == null) {
      const middleCanvas = new fabric.Canvas('middleCanvas', {
        width: window.screen.width,
        height: window.screen.height,
        containerClass: 'canvas-middle-container',
      });

      let middleContainer = document.querySelector('.canvas-middle-container');
      // @ts-ignore
      middleContainer.style.width = '100%';
      // @ts-ignore
      middleContainer.style.height = '100%';
      // @ts-ignore
      middleContainer.style.position = 'absolute';

      middleCanvasRef.current = middleCanvas;

      middleCanvasRef.current.on('selection:created', handleCanvasObjectSelected);
      middleCanvasRef.current.on('selection:updated', handleCanvasObjectSelected);
      middleCanvasRef.current.on('selection:cleared', handleCanvasObjectCleared);
    } else {
      if (currentTool === 'Label' || currentTool === 'Object') {
        middleCanvasRef.current.set('selection', false);
        middleCanvasRef.current.set('skipTargetFind', true);
      } else {
        middleCanvasRef.current.set('selection', true);
        middleCanvasRef.current.set('skipTargetFind', false);
      }

      middleCanvasRef.current.renderAll();
    } 
    middleCanvasRef.current.on('mouse:down', handleCanvasClick);

    // Создание верхнего холста
    brushOpacityRef.current = brushOpacity;
    brushColorModeRef.current = brushColorMode;
    if (upperCanvasRef.current == null) {
      const upperCanvas = new fabric.Canvas('upperCanvas', {
        width: window.screen.width,
        height: window.screen.height,
        containerClass: 'canvas-upper-container'
      });

      let upperContainer = document.querySelector('.canvas-upper-container');
      // @ts-ignore
      upperContainer.style.position = 'absolute';
      // @ts-ignore
      upperContainer.style.width = '100%';
      // @ts-ignore
      upperContainer.style.height = '100%';

      upperCanvasRef.current = upperCanvas;

      // Присваивание событий для рисования
      upperCanvasRef.current.on('mouse:down', handleMouseDown);
      upperCanvasRef.current.on('mouse:move', handleMouseMove);
      upperCanvasRef.current.on('mouse:up', () => {
        handleMouseUp();
        // Добавление прозрачности текстурной кисти
        if (brushColorModeRef.current === 'texture') {
          let lastDrawnObject = upperCanvasRef.current.getObjects().pop();
          lastDrawnObject.set('opacity', brushOpacityRef.current);
        }
      });
    }

    const mainContainer = document.getElementById('canvasContainer');

    // Обработчики событий для масштабирования и перемещения
    // Масштабирование прокруткой колёсика
    function handleMouseWheel(event) {
      const delta = event.deltaY;
      const zoom = lowerCanvasRef.current.getZoom();
      const zoomFactor = 0.999 ** delta;
      const newZoom = zoom * zoomFactor;
      if (newZoom > 20) return;
      if (newZoom < 0.01) return;
      
      lowerCanvasRef.current.zoomToPoint({ x: event.offsetX, y: event.offsetY }, newZoom);
      middleCanvasRef.current.zoomToPoint({ x: event.offsetX, y: event.offsetY }, newZoom);
      upperCanvasRef.current.zoomToPoint({ x: event.offsetX, y: event.offsetY }, newZoom);

      event.preventDefault();

      lowerCanvasRef.current.renderAll();
      middleCanvasRef.current.renderAll();
      upperCanvasRef.current.renderAll();
    }

    let isDragging = false;
    let lastPosX = 0;
    let lastPosY = 0;

    // Перемещение холста колёсиком (нажатие)
    function handleWheelDown(event) {
      if (event.button === 1) {
        isDragging = true;
        lowerCanvasRef.current.selection = false;
        middleCanvasRef.current.selection = false;
        upperCanvasRef.current.selection = false;
        lastPosX = event.clientX;
        lastPosY = event.clientY;
      }
    }

    // Перемещение холста колёсиком (перемещение)
    function handleWheelMove(event) {
      if (isDragging) {
          const e = event;
          const deltaX = e.clientX - lastPosX;
          const deltaY = e.clientY - lastPosY;
  
          [lowerCanvasRef, middleCanvasRef, upperCanvasRef].forEach(canvasRef => {
              const vpt = canvasRef.current.viewportTransform;
              vpt[4] += deltaX;
              vpt[5] += deltaY;
              canvasRef.current.requestRenderAll();
          });
  
          lastPosX = e.clientX;
          lastPosY = e.clientY;
      }
    }

    // Перемещение холста колёсиком (отпускание)
    function handleWheelUp(event) {
      [lowerCanvasRef, middleCanvasRef, upperCanvasRef].forEach(canvasRef => {
          const canvas = canvasRef.current;
          canvas.setViewportTransform(canvas.viewportTransform);
          canvas.selection = true;
      });
  
      isDragging = false;
    }

    let upperContainer = document.querySelector('.canvas-upper-container');
    let middleContainer = document.querySelector('.canvas-middle-container');

    // Переключение активных слоёв
    if (currentTool === 'Canvas' || currentTool === 'Object' || currentTool === 'Label') {

      // Отключение событий с верхнего слоя
      // @ts-ignore
      upperContainer.style.pointerEvents = 'none';
      // Включение событий для среднего слоя
      // @ts-ignore
      middleContainer.style.pointerEvents = 'auto';

      middleCanvasRef.current.discardActiveObject().renderAll();
      setIsToolSettingsPanelVisible(true);

      setLabelSelected(null);
      setObjectSelected(null);

    } else if (currentTool === 'Brush') {
      if (brushCurrentLayerRef.current === 'upper') {

        // Включение событий для верхнего слоя
        // @ts-ignore
        upperContainer.style.pointerEvents = 'auto';

      } else if (brushCurrentLayerRef.current === 'lower') {

        // Отключение событий с верхнего слоя
        // @ts-ignore
        upperContainer.style.pointerEvents = 'none';

        // Отключение событий со среднего слоя
        // @ts-ignore
        middleContainer.style.pointerEvents = 'none';
      }
    } else if (currentTool === null) {
      
      // Отключение событий с верхнего слоя
      // @ts-ignore
      upperContainer.style.pointerEvents = 'none';

      // Включение событий для среднего слоя
      // @ts-ignore
      middleContainer.style.pointerEvents = 'auto';

    }

    // Изменение свойств нарисованных объектов, чтобы их нельзя было выделять
    const disableBrushObjectsSelection = () => {
      const allObjects = lowerCanvasRef.current.getObjects().concat(upperCanvasRef.current.getObjects());

      allObjects.forEach((obj) => {
        if (
          obj instanceof fabric.Path &&
          obj.get('path') &&
          obj.get('path').length > 1
        ) {
          obj.selectable = false;
          obj.hoverCursor = 'default';
        };
      });
    }

    // Создание кисти для холста
    const createBrush = () => {
      if (brushColorMode === 'color') {
        // Создание обычной кисти
        const colorBrush = new fabric.PencilBrush((brushCurrentLayerRef.current === 'upper' ? upperCanvasRef.current : lowerCanvasRef.current));
        colorBrush.color = `rgba(${parseInt(brushColor.slice(1, 3), 16)}, ${parseInt(brushColor.slice(3, 5), 16)}, ${parseInt(brushColor.slice(5, 7), 16)}, ${brushOpacity})`;
        colorBrush.width = brushThickness;
        colorBrush.strokeLineCap = brushShape;
        (brushCurrentLayerRef.current === 'upper' ? upperCanvasRef.current : lowerCanvasRef.current).freeDrawingBrush = colorBrush;
      } else if (brushColorMode === 'texture') {
        // Создание кисти с текстурой
        const textureImage = new Image();
        textureImage.onload = function () {
          const textureBrush = new fabric.PatternBrush((brushCurrentLayerRef.current === 'upper' ? upperCanvasRef.current : lowerCanvasRef.current));
          // @ts-ignore Помечается как ошибка, но без этого не работает
          textureBrush.source = this;
          textureBrush.color = brushColor;
          textureBrush.width = brushThickness;
          textureBrush.strokeLineCap = brushShape;
          (brushCurrentLayerRef.current === 'upper' ? upperCanvasRef.current : lowerCanvasRef.current).freeDrawingBrush = textureBrush;
        };
        textureImage.src = brushTexture;
      } else if (brushColorMode === 'eraser') {
        // Создание ластика
        const eraserBrush = new fabric.EraserBrush((brushCurrentLayerRef.current === 'upper' ? upperCanvasRef.current : lowerCanvasRef.current));
        eraserBrush.width = brushThickness;
        eraserBrush.strokeLineCap = brushShape;
        (brushCurrentLayerRef.current === 'upper' ? upperCanvasRef.current : lowerCanvasRef.current).freeDrawingBrush = eraserBrush;
      }
    };

    // Обновление кисти
    createBrush();

    // Установка обработчиков рисования кистью при смене инструмента
    if (currentTool === "Brush") {
      (brushCurrentLayerRef.current === 'upper' ? upperCanvasRef.current : lowerCanvasRef.current).isDrawingMode = true;
    } else {
      // Выключение режима рисования при смене инструмента
      (brushCurrentLayerRef.current === 'upper' ? upperCanvasRef.current : lowerCanvasRef.current).isDrawingMode = false;

      disableBrushObjectsSelection();
    }

    // Присваивание событий для масштабирования и перемещения
    mainContainer.addEventListener('wheel', handleMouseWheel);
    mainContainer.addEventListener('mousedown', handleWheelDown);
    mainContainer.addEventListener('mousemove', handleWheelMove);
    mainContainer.addEventListener('mouseup', handleWheelUp);

    return () => {
      // Удаление обработчиков событий при размонтировании компонента
      mainContainer.removeEventListener('wheel', handleMouseWheel);
      mainContainer.removeEventListener('mousedown', handleWheelDown);
      mainContainer.removeEventListener('mousemove', handleWheelMove);
      mainContainer.removeEventListener('mouseup', handleWheelUp);

      lowerCanvasRef.current.off('mouse:down', handleMouseDown);
      lowerCanvasRef.current.off('mouse:move', handleMouseMove);
      lowerCanvasRef.current.off('mouse:up', handleMouseUp);

      middleCanvasRef.current.off('mouse:down', handleCanvasClick);

      upperCanvasRef.current.off('mouse:down', handleMouseDown);
      upperCanvasRef.current.off('mouse:move', handleMouseMove);
      upperCanvasRef.current.off('mouse:up', handleMouseUp);
    };
  }, [canvasWidth, canvasHeight, canvasBackgroundColor, isResetRequired, setIsResetRequired, brushColor, brushOpacity, brushThickness, brushCurrentLayer, currentTool, brushColorMode, brushTexture, canvasBackgroundIsColorMode, canvasBackgroundTexture, brushShape, labelText, labelFontSize, labelCharSpacing, labelLineHeight, labelRotation, labelBorderWidth, labelFont, labelColor, labelBorderColor, labelIsBold, labelIsItalic, labelAlign, setCurrentTool, setLabelFontSize, setLabelIsBold, setLabelIsItalic, setIsToolSettingsPanelVisible, setLabelAlign, setLabelBorderColor, setLabelBorderWidth, setLabelColor, setLabelRotation, setLabelCharSpacing, setLabelLineHeight, setLabelFont, setLabelSelected, labelSelected, setLabelText, setTypeOfChoosenObject, objectSize, objectOpacity, objectRotation, objectSaturation, objectBrightness, objectContrast, objectIsUseRandom, objectIsHorizontalMirrored, objectIsVerticalMirrored, labelOpacity, recentlyUsedObjects, objectSelected, setLabelOpacity, setObjectBrightness, setObjectContrast, setObjectIsHorizontalMirrored, setObjectIsVerticalMirrored, setObjectOpacity, setObjectRotation, setObjectSaturation, setObjectSelected, setObjectSize, typeOfChoosenObject]);

  // Состояния холста
  const [canvasState, setCanvasState] = useState({
    list: [],
    index: 0,
  });

  // Если карта была выбрана для редактирования, то загружаем её
  useEffect(() => {
    async function setNewWorkingArea() {
      // Получаем объекты холста
      const canvasObjects = lowerCanvasRef.current.getObjects();

      // Поиск рабочей области по свойству нестираемости (есть только у неё)
      canvasObjects.find((obj) => {
        if (obj.erasable === false) {
          console.log(obj);
          workingAreaRef.current = obj;
          setCanvasWidth(obj.width);
          setCanvasHeight(obj.height);
          if (typeof obj.fill === 'string') {
            // obj.fill является цветом
            setCanvasBackgroundIsColorMode(true);
            setCanvasBackgroundColor(obj.fill);
          } else if (typeof obj.fill === 'object' && obj.fill.type === 'pattern') {
            // obj.fill является паттерном
            setCanvasBackgroundIsColorMode(false);
            setCanvasBackgroundTexture(obj.fill.source.src);
          }
        }
      });
    }

    async function loadMapData(Id) {
      try {
        let rawMapData = await myMapData(Id);

        let mapData = rawMapData.data;

        console.log(mapData);

        const lowerCanvasData = mapData.lowerCanvas;
        console.log(lowerCanvasData);
        const middleCanvasData = mapData.middleCanvas;
        const upperCanvasData = mapData.upperCanvas;

        // Очищаем холсты перед загрузкой данных
        await lowerCanvasRef.current.clear();
        await middleCanvasRef.current.clear();
        await upperCanvasRef.current.clear();

        // Загружаем данные
        await lowerCanvasRef.current.loadFromJSON(lowerCanvasData, async () => {
          await middleCanvasRef.current.loadFromJSON(middleCanvasData, async () => {
            await upperCanvasRef.current.loadFromJSON(upperCanvasData, () => {
              setNewWorkingArea();
            });
          });
        });
      } catch (error) {
        console.error('Ошибка при загрузке данных карты:', error);
      }
    }

    if (Number(id_map) !== 0) {
      loadMapData(id_map);
    }
  }, [])

  const [isUndoOrRedoInProgress, setIsUndoOrRedoInProgress] = useState(false);

  useEffect(() => {
    // Сохранение начального состояния холста при загрузке приложения
    setTimeout(() => {
      const initialCanvasState = JSON.stringify({
        lowerCanvas: lowerCanvasRef.current.toObject(),
        middleCanvas: middleCanvasRef.current.toObject(),
        upperCanvas: upperCanvasRef.current.toObject(),
      });

      setCanvasState(prevState => ({
        list: [initialCanvasState],
        index: 0,
      }));
    }, 1000)

    console.log('Изначальные данные сохранены');
  }, []);

  useEffect(() => {
    // Функция отслеживания действий
    function handleCanvasState(event)  {
      if (!isUndoOrRedoInProgress) {
        let object = event.target;
        console.log('Вызвана функция отслеживания действий');
        console.log('Обработанный объект', object);
        
        const canvasData = {
          lowerCanvas: lowerCanvasRef.current.toObject(),
          middleCanvas: middleCanvasRef.current.toObject(),
          upperCanvas: upperCanvasRef.current.toObject(),
        };
    
        setCanvasState(prevState => {
          const updatedList = [...prevState.list.slice(0, prevState.index + 1), JSON.stringify(canvasData)];
          if (updatedList.length > 20) {
            // Если количество состояний превышает 20, сдвигаем их на одну позицию назад
            return { ...prevState, list: updatedList.slice(1), index: prevState.index };
          } else {
            return { ...prevState, list: updatedList, index: prevState.index + 1 };
          }
        })
      }
    }

    // Присвоение функций отслеживания действий
    function addEventListeners() {
      lowerCanvasRef.current.on("object:added", handleCanvasState);
      middleCanvasRef.current.on("object:added", handleCanvasState);
      upperCanvasRef.current.on("object:added", handleCanvasState);
  
      lowerCanvasRef.current.on("object:modified", handleCanvasState);
      middleCanvasRef.current.on("object:modified", handleCanvasState);
      upperCanvasRef.current.on("object:modified", handleCanvasState);

      lowerCanvasRef.current.on("object:removed", handleCanvasState);
      middleCanvasRef.current.on("object:removed", handleCanvasState);
      upperCanvasRef.current.on("object:removed", handleCanvasState);

      if (brushColorMode === 'eraser') {
        lowerCanvasRef.current.on("path:created", handleCanvasState);
        middleCanvasRef.current.on("path:created", handleCanvasState);
        upperCanvasRef.current.on("path:created", handleCanvasState);
      }
    };
  
    function removeEventListeners() {
      lowerCanvasRef.current.off("object:added", handleCanvasState);
      middleCanvasRef.current.off("object:added", handleCanvasState);
      upperCanvasRef.current.off("object:added", handleCanvasState);
  
      lowerCanvasRef.current.off("object:modified", handleCanvasState);
      middleCanvasRef.current.off("object:modified", handleCanvasState);
      upperCanvasRef.current.off("object:modified", handleCanvasState);

      lowerCanvasRef.current.off("object:removed", handleCanvasState);
      middleCanvasRef.current.off("object:removed", handleCanvasState);
      upperCanvasRef.current.off("object:removed", handleCanvasState);

      lowerCanvasRef.current.off("path:created", handleCanvasState);
      middleCanvasRef.current.off("path:created", handleCanvasState);
      upperCanvasRef.current.off("path:created", handleCanvasState);
    };
  
    if (!isUndoOrRedoInProgress) {
      addEventListeners();
    } else {
      removeEventListeners();
    }
  
    // Применить состояние объектов на холсте
    async function applyStateToCanvas(state) {
      console.log('Начало применения изменений');

      await lowerCanvasRef.current.clear(); // Очищаем холст перед загрузкой нового состояния
      await middleCanvasRef.current.clear(); // Очищаем холст перед загрузкой нового состояния
      await upperCanvasRef.current.clear(); // Очищаем холст перед загрузкой нового состояния

      // Загружаем новое состояние на каждый холст
      await lowerCanvasRef.current.loadFromJSON(state.lowerCanvas, () => {
          lowerCanvasRef.current.forEachObject(obj => {
              obj.isObjectRerendered = true;
          });
      });
      await middleCanvasRef.current.loadFromJSON(state.middleCanvas, () => {
          middleCanvasRef.current.forEachObject(obj => {
              obj.isObjectRerendered = true;
          });
      });
      await upperCanvasRef.current.loadFromJSON(state.upperCanvas, () => {
          upperCanvasRef.current.forEachObject(obj => {
              obj.isObjectRerendered = true;
          });
      });

      lowerCanvasRef.current.renderAll();
      middleCanvasRef.current.renderAll();
      upperCanvasRef.current.renderAll();

      console.log('Были применены изменения');
  };

    async function undo() {
      removeEventListeners();
      console.log('Запущена отмена последнего действия');
      setIsUndoOrRedoInProgress(true);

      let prevCanvasState = canvasState;
      console.log('Холст до отмены: ', prevCanvasState);

      await applyStateToCanvas(JSON.parse(canvasState.list[canvasState.index - 1])); // Применяем состояние на холсте

      setCanvasState(prev => {return {list: prevCanvasState.list, index: prevCanvasState.index - 1}});
      console.log('Холст после отмены: ', canvasState);
      
      console.log('Закончена отмена последнего действия');
    }

    if (isUndoRequired && canvasState.index > 0) {
      setIsUndoRequired(false);
      undo();
      // Костыльное решение из-за проблем с асинхронностью
      setTimeout(() => {
        setIsUndoOrRedoInProgress(false);
      });
    } else {
      setIsUndoRequired(false);
    }

    async function redo() {
      removeEventListeners();
      console.log('Запущен возврат последнего действия');
      setIsUndoOrRedoInProgress(true);

      let prevCanvasState = canvasState;
      console.log('Холст до возврата: ', prevCanvasState);

      await applyStateToCanvas(JSON.parse(canvasState.list[canvasState.index + 1])); // Применяем состояние на холсте

      setCanvasState(prev => {return {...prev, list: prevCanvasState.list, index: prevCanvasState.index + 1}});
      console.log('Холст после возврата: ', canvasState);

      console.log('Закончен возврат последнего действия');
    }

    if (isRedoRequired && canvasState.index < canvasState.list.length - 1) {
      setIsRedoRequired(false);
      redo();
      // Костыльное решение из-за проблем с асинхронностью
      setTimeout(() => {
        setIsUndoOrRedoInProgress(false);
      });
    } else {
      setIsRedoRequired(false);
    }

    return () => {
      removeEventListeners();
    };
  }, [canvasState, isRedoRequired, isUndoOrRedoInProgress, isUndoRequired, setIsRedoRequired, setIsUndoRequired, brushColorMode]);

  useEffect(() => {
    console.log(canvasState);
  }, [canvasState]);

  // Сохранение карты на сервере
  useEffect(() => {
    async function handleSaveMapData() {
      toast('Начало сохранения');
      
      // Создаем временный холст для сбора всего содержимого
        const tempCanvas = new fabric.StaticCanvas(null, {
          width: canvasWidth,
          height: canvasHeight
      });

      // Определяем рамки рабочей области
      const centerX = (workingAreaRef.current.left);
      const centerY = (workingAreaRef.current.top);
      tempCanvas.absolutePan({
        x: centerX,
        y: centerY
      });

      // Создаем копии объектов с каждого холста и добавляем их на временный холст
      lowerCanvasRef.current.getObjects().forEach(obj => {
          const cloneObj = fabric.util.object.clone(obj);
          tempCanvas.add(cloneObj);
      });

      middleCanvasRef.current.getObjects().forEach(obj => {
          const cloneObj = fabric.util.object.clone(obj);
          tempCanvas.add(cloneObj);
      });

      upperCanvasRef.current.getObjects().forEach(obj => {
          const cloneObj = fabric.util.object.clone(obj);
          tempCanvas.add(cloneObj);
      });

      // Преобразуем содержимое в URL данных
      const mapImageDataURL = tempCanvas.toDataURL({
        format: 'jpg',
        quality: 1 // качество изображения
      });

      let mapData = canvasState.list[canvasState.index];

      let savedMapId = await saveMapData(id_map, mapData, mapImageDataURL);
      
      navigate("/editor/" + savedMapId);

      toast('Данные успешно сохранены');
    }

    if (isSaveRequired) {
      setIsSaveRequired(false);
      handleSaveMapData();
    }
  }, [isSaveRequired])

  // Экспорт изображения карты
  useEffect(() => {
    if (isExportRequired) {
      // Создаем временный холст для сбора всего содержимого
      const tempCanvas = new fabric.StaticCanvas(null, {
        width: canvasWidth,
        height: canvasHeight
      });
  
      // Определяем рамки рабочей области
      const centerX = (workingAreaRef.current.left);
      const centerY = (workingAreaRef.current.top);
      tempCanvas.absolutePan({
        x: centerX,
        y: centerY
      });
  
      // Создаем копии объектов с каждого холста и добавляем их на временный холст
      lowerCanvasRef.current.getObjects().forEach(obj => {
        const cloneObj = fabric.util.object.clone(obj);
        tempCanvas.add(cloneObj);
      });
  
      middleCanvasRef.current.getObjects().forEach(obj => {
        const cloneObj = fabric.util.object.clone(obj);
        tempCanvas.add(cloneObj);
      });
  
      upperCanvasRef.current.getObjects().forEach(obj => {
        const cloneObj = fabric.util.object.clone(obj);
        tempCanvas.add(cloneObj);
      });
  
      // Преобразуем содержимое в URL данных
      const dataURL = tempCanvas.toDataURL({
        format: 'jpg',
        quality: 1 // качество изображения
      });
  
      // Создаем ссылку для загрузки
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'canvas_export.jpg'; // имя файла
      document.body.appendChild(link);
  
      // Кликаем по ссылке для скачивания изображения
      link.click();
  
      // Удаляем ссылку из DOM
      document.body.removeChild(link);
      // Сбрасываем флаг экспорта
      setIsExportRequired(false);
    }
  }, [isExportRequired]);

  return (
    <>
      <ToastContainer theme="dark" position="bottom-center"/>
      <div id="canvasContainer" className="canvasContainer">
        {/* Нижний холст */}
        <canvas id='lowerCanvas' className="canvas-lower" />
        {/* Средний холст */}
        <canvas id='middleCanvas' className="canvas-middle" />
        {/* Верхний холст */}
        <canvas id='upperCanvas' className="canvas-upper" />
      </div>
    </>
    
  );
}