import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric-all-modules';
import { useBrushSettingsStore, useCanvasSettingsStore, useGeneralGraphicEditorStore, useLabelSettingsState, useObjectSettingsState } from 'store/store';

import BanditImage from "../../assets/objects/bandit.png";

export default function CanvasComponent() {
    const {
      currentTool, setCurrentTool,
      isExportRequired, setIsExportRequired,
      isUndoRequired, setIsUndoRequired,
      isRedoRequired, setIsRedoRequired,
      setIsToolSettingsPanelVisible,
      setChoosenObject,
    } = useGeneralGraphicEditorStore();
    
    const {
        brushColorMode,
        currentBrushTexture,
        brushColor,
        currentBrushLayer,
        brushThickness,
        brushShape,
        brushOpacity,
        brushSoftness,
    } = useBrushSettingsStore();

    const {
      canvasWidth,
      canvasHeight,
      filterIntensity,
      isResetRequired, setIsResetRequired,
      backgroundColorMode,
      currentBackgroundTexture,
      canvasBackgroundColor,
      selectedFilter,
    } = useCanvasSettingsStore();

    const {
      currentLabelValue, setCurrentLabelValue,
      fontSize, setFontSize,
      letterSpacing, setLetterSpacing,
      lineSpacing, setLineSpacing,
      labelRotation, setLabelRotation,
      labelBorderWidth, setLabelBorderWidth,
      selectedFont, setSelectedFont,
      labelColor, setLabelColor,
      labelBorderColor, setLabelBorderColor,
      isLabelBold, setIsLabelBold,
      isLabelItalic, setIsLabelItalic,
      labelAlign, setLabelAlign,
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
    objectIsVerticalMirrored, setObjectIsVerticalMirrored
} = useObjectSettingsState();

    // Холсты и рабочая область
    const lowerCanvasRef = useRef(null);
    const middleCanvasRef = useRef(null);
    const upperCanvasRef = useRef(null);
    const workingAreaRef = useRef(null);
  
    // Нужно для корректной работы событий холстов
    const currentBrushLayerRef = useRef(currentBrushLayer);
    const brushOpacityRef = useRef(brushOpacity);
    const brushColorModeRef = useRef(brushColorMode);

    useEffect(() => {
      currentBrushLayerRef.current = currentBrushLayer;

      // Рисование при выборе кисти
      const handleMouseDown = (event) => {
        if (event.button === 0) {
          if (currentTool === "Brush") {
            if (currentBrushLayerRef.current === 'upper') {
              upperCanvasRef.current.isDrawingMode = true;
              upperCanvasRef.current.freeDrawingBrush.onMouseDown(event);
            } else if (currentBrushLayerRef.current === 'lower') {
              lowerCanvasRef.current.isDrawingMode = true;
              lowerCanvasRef.current.freeDrawingBrush.onMouseDown(event);
            }
          }
        }
      };
    
      const handleMouseMove = (event) => {
        if (event.button === 0) {
          if (currentTool === "Brush") {
            (currentBrushLayerRef.current === 'upper' ? upperCanvasRef.current : lowerCanvasRef.current).freeDrawingBrush.onMouseMove(event);
          }
        }
      };
      
      const handleMouseUp = () => {
        if (currentTool === "Brush") {
          if (currentBrushLayerRef.current === 'upper') {
            upperCanvasRef.current.isDrawingMode = false;
            upperCanvasRef.current.freeDrawingBrush.onMouseUp();
          } else if (currentBrushLayerRef.current === 'lower') {
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
        lowerCanvasRef.current.set({
          width: window.screen.width,
          height: window.screen.height,
        });

        workingAreaRef.current.set({
          width: canvasWidth,
          height: canvasHeight,
          left: (window.screen.width - canvasWidth) / 2,
          top: (window.screen.height - canvasHeight) / 2,
        });

        // Установка цвета фона или текстуры фона для рабочей области
        if (backgroundColorMode) {
          workingAreaRef.current.set('fill', canvasBackgroundColor);
        } else {
          fabric.util.loadImage(currentBackgroundTexture, function(img) {
            const texture = new fabric.Pattern({
              source: img,
              repeat: 'repeat'
            });
            workingAreaRef.current.set('fill', texture);
            workingAreaRef.current.dirty = true;
            workingAreaRef.current.canvas.renderAll();
          });
        }

        lowerCanvasRef.current.renderAll();
      }

      // Обработка добавления подписи и объектов на холст
      const handleCanvasClick = (event) => {
        var p = middleCanvasRef.current.getPointer(event);

        if (currentTool === 'Label' && currentLabelValue !== '') {
          // Создание нового текстового объекта
          const text = new fabric.Text(currentLabelValue, {
            left: p.x,
            top: p.y,
            fill: labelColor,
            fontSize: fontSize,
            fontFamily: selectedFont,
            angle: labelRotation,
            stroke: labelBorderColor,
            strokeWidth: labelBorderWidth,
            fontWeight: isLabelBold ? 'bold' : 'normal',
            fontStyle: isLabelItalic ? 'italic' : 'normal',
            textAlign: labelAlign,
            charSpacing: letterSpacing * 500,
            lineHeight: lineSpacing,
          });
      
          // Добавление текстового объекта на холст
          middleCanvasRef.current.add(text);
      
          // Обновление холста
          middleCanvasRef.current.renderAll();
        }

        if (currentTool === 'Object') {
          fabric.Image.fromURL(BanditImage, (img) => {
            const image = new fabric.Image(img.getElement(), {
              left: p.x,
              top: p.y,
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
              ]
            });

            console.log(image);
    
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

          if (selectedObject.type === 'text') {
            setCurrentTool(null);
            setIsToolSettingsPanelVisible(true);
            setChoosenObject('Label')
            
            setCurrentLabelValue(selectedObject.text);
            setFontSize(selectedObject.fontSize);
            setLetterSpacing(selectedObject.charSpacing / 500);
            setLineSpacing(selectedObject.lineHeight);
            setLabelRotation(selectedObject.angle);
            setLabelBorderWidth(selectedObject.strokeWidth);
            setSelectedFont(selectedObject.fontFamily);
            setLabelColor(selectedObject.fill);
            setLabelBorderColor(selectedObject.stroke);
            setIsLabelBold(selectedObject.fontWeight === "bold");
            setIsLabelItalic(selectedObject.fontStyle === "italic");
            setLabelAlign(selectedObject.textAlign);

            setLabelSelected(selectedObject);
          }
        }
      };

      // Обработка снятия выбора 
      const handleCanvasObjectCleared = (event) => {
        setLabelSelected(null);
        setIsToolSettingsPanelVisible(false);
        setChoosenObject(null);
      };

      // Создание среднего холста
      if (middleCanvasRef.current == null) {
        const middleCanvas = new fabric.Canvas('middleCanvas', {
          width: window.screen.width,
          height: window.screen.height,
          containerClass: 'canvas-middle-container',
        });

        const rect = new fabric.Rect({
          left: (window.screen.width - canvasWidth) / 2,
          top: (window.screen.height - canvasHeight) / 2,
          fill: 'red',
          width: 100,
          height: 100,
        });
  
        middleCanvas.add(rect);

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
        middleCanvasRef.current.set({
          width: window.screen.width,
          height: window.screen.height,
        });

        if (currentTool === 'Label' || currentTool === 'Object') {
          middleCanvasRef.current.set({
            skipTargetFind: true,
            selection: false,
          });
        } else {
          middleCanvasRef.current.set({
            selection: true,
            skipTargetFind: false,
          });
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
      } else {
        upperCanvasRef.current.set({
          width: window.screen.width,
          height: window.screen.height,
        });

        upperCanvasRef.current.renderAll();
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

      // Сброс масштабирования (функционал скрыт)
      if (isResetRequired) {
        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;

        lowerCanvasRef.current.zoomToPoint({ x: centerX, y: centerY }, 1);
        middleCanvasRef.current.zoomToPoint({ x: centerX, y: centerY }, 1);
        upperCanvasRef.current.zoomToPoint({ x: centerX, y: centerY }, 1);

        lowerCanvasRef.current.centerObject(workingAreaRef.current);

        setIsResetRequired(false);
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

        setLabelSelected(null);

      } else if (currentTool === 'Brush') {
        if (currentBrushLayerRef.current === 'upper') {

          // Включение событий для верхнего слоя
          // @ts-ignore
          upperContainer.style.pointerEvents = 'auto';

        } else if (currentBrushLayerRef.current === 'lower') {

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
          const colorBrush = new fabric.PencilBrush((currentBrushLayerRef.current === 'upper' ? upperCanvasRef.current : lowerCanvasRef.current));
          colorBrush.color = `rgba(${parseInt(brushColor.slice(1, 3), 16)}, ${parseInt(brushColor.slice(3, 5), 16)}, ${parseInt(brushColor.slice(5, 7), 16)}, ${brushOpacity})`;
          colorBrush.width = brushThickness;
          colorBrush.strokeLineCap = brushShape;
          (currentBrushLayerRef.current === 'upper' ? upperCanvasRef.current : lowerCanvasRef.current).freeDrawingBrush = colorBrush;
        } else if (brushColorMode === 'texture') {
          // Создание кисти с текстурой
          const textureImage = new Image();
          textureImage.onload = function () {
            const textureBrush = new fabric.PatternBrush((currentBrushLayerRef.current === 'upper' ? upperCanvasRef.current : lowerCanvasRef.current));
            // @ts-ignore Помечается как ошибка, но без этого не работает
            textureBrush.source = this;
            textureBrush.color = brushColor;
            textureBrush.width = brushThickness;
            textureBrush.strokeLineCap = brushShape;
            (currentBrushLayerRef.current === 'upper' ? upperCanvasRef.current : lowerCanvasRef.current).freeDrawingBrush = textureBrush;
          };
          textureImage.src = currentBrushTexture;
        } else if (brushColorMode === 'eraser') {
          // Создание ластика
          const eraserBrush = new fabric.EraserBrush((currentBrushLayerRef.current === 'upper' ? upperCanvasRef.current : lowerCanvasRef.current));
          eraserBrush.width = brushThickness;
          eraserBrush.strokeLineCap = brushShape;
          (currentBrushLayerRef.current === 'upper' ? upperCanvasRef.current : lowerCanvasRef.current).freeDrawingBrush = eraserBrush;
        }
      };

      // Обновление кисти
      createBrush();

      // Установка обработчиков рисования кистью при смене инструмента
      if (currentTool === "Brush") {
        (currentBrushLayerRef.current === 'upper' ? upperCanvasRef.current : lowerCanvasRef.current).isDrawingMode = true;
      } else {
        // Выключение режима рисования при смене инструмента
        (currentBrushLayerRef.current === 'upper' ? upperCanvasRef.current : lowerCanvasRef.current).isDrawingMode = false;

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
    }, [canvasWidth, canvasHeight, canvasBackgroundColor, isResetRequired, setIsResetRequired, brushColor, brushOpacity, brushThickness, currentBrushLayer, currentTool, brushColorMode, currentBrushTexture, backgroundColorMode, currentBackgroundTexture, brushShape, currentLabelValue, fontSize, letterSpacing, lineSpacing, labelRotation, labelBorderWidth, selectedFont, labelColor, labelBorderColor, isLabelBold, isLabelItalic, labelAlign, setCurrentTool, setFontSize, setIsLabelBold, setIsLabelItalic, setIsToolSettingsPanelVisible, setLabelAlign, setLabelBorderColor, setLabelBorderWidth, setLabelColor, setLabelRotation, setLetterSpacing, setLineSpacing, setSelectedFont, setLabelSelected, labelSelected, setCurrentLabelValue, labelSelected, setChoosenObject, objectSize, objectOpacity, objectRotation, objectSaturation, objectBrightness, objectContrast,objectIsUseRandom, objectIsHorizontalMirrored, objectIsVerticalMirrored,]);

    // Экспорт изображения карты
    useEffect(() => {
      if (isExportRequired) {
        // Создаем временный холст для сбора всего содержимого
        const tempCanvas = new fabric.StaticCanvas(null, {
          width: canvasWidth,
          height: canvasHeight
        });
    
        // Определяем центр рабочей области
        const centerX = (window.screen.width - canvasWidth) / 2;
        const centerY = (window.screen.height - canvasHeight) / 2;
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
          format: 'jpeg',
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
    }, [isExportRequired, setIsExportRequired, canvasWidth, canvasHeight]);

    return (
      <div id="canvasContainer" className="canvasContainer">
        {/* Нижний холст */}
        <canvas id='lowerCanvas' className="canvas-lower" />
        {/* Средний холст */}
        <canvas id='middleCanvas' className="canvas-middle" />
        {/* Верхний холст */}
        <canvas id='upperCanvas' className="canvas-upper" />
      </div>
    );
  }