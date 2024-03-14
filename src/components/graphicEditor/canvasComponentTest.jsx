import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

export default function CanvasComponentTest({ currentTool, 
  brushColor, currentBrushLayer, brushThickness, brushOpacity, brushSoftness,
  canvasWidth, canvasHeight, filterIntensity, isResetRequired, setIsResetRequired, canvasBackgroundColor, selectedFilter }) {
    const lowerCanvasRef = useRef(null);
    const middleCanvasRef = useRef(null);
    const upperCanvasRef = useRef(null);
    const workingAreaRef = useRef(null)
  
    useEffect(() => {
      // Создание нижнего холста
      if (lowerCanvasRef.current == null) {
        const lowerCanvas = new fabric.Canvas('lowerCanvas', {
          width: window.innerWidth,
          height: window.innerHeight,
          backgroundColor: '#252525',
          containerClass: 'canvas-lower-container'
        });

        // Создание рабочей области
        const workingArea = new fabric.Rect({
          left: (lowerCanvas.width - canvasWidth) / 2,
          top: (lowerCanvas.height - canvasHeight) / 2,
          width: canvasWidth,
          height: canvasHeight,
          fill: canvasBackgroundColor,
          selectable: false,
          evented: false,
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
      } else {
        workingAreaRef.current.set({
          left: (lowerCanvasRef.current.width - canvasWidth) / 2,
          top: (lowerCanvasRef.current.height - canvasHeight) / 2,
          width: canvasWidth,
          height: canvasHeight,
          fill: canvasBackgroundColor
        });

        lowerCanvasRef.current.set({
          width: window.innerWidth,
          height: window.innerHeight,
        });

        lowerCanvasRef.current.renderAll();
      }

      // Создание среднего холста
      if (middleCanvasRef.current == null) {
        
        const middleCanvas = new fabric.Canvas('middleCanvas', {
          width: window.innerWidth,
          height: window.innerHeight,
          containerClass: 'canvas-middle-container'
        });

        let middleContainer = document.querySelector('.canvas-middle-container');
        // @ts-ignore
        middleContainer.style.width = '100%';
        // @ts-ignore
        middleContainer.style.height = '100%';
        // @ts-ignore
        middleContainer.style.position = 'absolute';

        middleCanvasRef.current = middleCanvas;
      } else {
        middleCanvasRef.current.set({
          width: window.innerWidth,
          height: window.innerHeight,
        });

        middleCanvasRef.current.renderAll();
      }
  
      // Создание верхнего холста
      if (upperCanvasRef.current == null) {
        const upperCanvas = new fabric.Canvas('upperCanvas', {
          width: window.innerWidth,
          height: window.innerHeight,
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
      } else {
        upperCanvasRef.current.set({
          width: window.innerWidth,
          height: window.innerHeight,
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
          lastPosX = event.clientX;
          lastPosY = event.clientY;
        }
      }

      // Перемещение холста колёсиком (перемещение)
      function handleWheelMove(event) {
        if (isDragging) {
          
          const e = event;
          const vpt = lowerCanvasRef.current.viewportTransform;
          vpt[4] += e.clientX - lastPosX;
          vpt[5] += e.clientY - lastPosY;

          lowerCanvasRef.current.requestRenderAll();
          middleCanvasRef.current.requestRenderAll();
          upperCanvasRef.current.requestRenderAll();

          lastPosX = e.clientX;
          lastPosY = e.clientY;
        }
      }

      // Перемещение холста колёсиком (отпускание)
      function handleWheelUp(event) {
        lowerCanvasRef.current.setViewportTransform(lowerCanvasRef.current.viewportTransform);
        middleCanvasRef.current.setViewportTransform(middleCanvasRef.current.viewportTransform);
        upperCanvasRef.current.setViewportTransform(upperCanvasRef.current.viewportTransform);

        isDragging = false;
        lowerCanvasRef.current.selection = true;
        mainContainer.style.cursor = 'grab';
      }

      // Сброс масштабирования
      if (isResetRequired) {
        lowerCanvasRef.current.setZoom(1);
        middleCanvasRef.current.setZoom(1);
        upperCanvasRef.current.setZoom(1);

        setIsResetRequired(false);
      }

      const handleMouseDown = (event) => {
        if (currentTool === "Brush") {
          if (currentBrushLayer === 'lower') {
            lowerCanvasRef.current.isDrawingMode = true;
            lowerCanvasRef.current.freeDrawingBrush.onMouseDown(event);
          } else if (currentBrushLayer === 'upper') {
            upperCanvasRef.current.isDrawingMode = true;
            upperCanvasRef.current.freeDrawingBrush.onMouseDown(event);
          }
        }
      };
  
      const handleMouseMove = (event) => {
        if (currentTool === "Brush") {
          if (currentBrushLayer === 'lower') {
            lowerCanvasRef.current.freeDrawingBrush.onMouseMove(event);
          } else if (currentBrushLayer === 'upper') {
            upperCanvasRef.current.freeDrawingBrush.onMouseMove(event);
          }
        }
      };
  
      const handleMouseUp = () => {
        if (currentTool === "Brush") {
          if (currentBrushLayer === 'lower') {
            lowerCanvasRef.current.isDrawingMode = false;
            lowerCanvasRef.current.freeDrawingBrush.onMouseUp();
          } else if (currentBrushLayer === 'upper') {
            upperCanvasRef.current.isDrawingMode = false;
            upperCanvasRef.current.freeDrawingBrush.onMouseUp();
          }
        }
      };

      // Изменение свойств нарисованных объектов, чтобы их нельзя было выделять
      const disableBrushObjectsSelection = () => {
        const allObjects = lowerCanvasRef.current.getObjects().concat(upperCanvasRef.current.getObjects());

        // Фильтруем объекты, чтобы оставить только те, которые нарисованы кистью
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

      // Установка обработчиков рисования кистью при смене инструмента
      if (currentTool === "Brush") {
        upperCanvasRef.current.isDrawingMode = true;
        upperCanvasRef.current.freeDrawingBrush = new fabric.PencilBrush(upperCanvasRef.current);
        upperCanvasRef.current.freeDrawingBrush.color = brushColor;
        upperCanvasRef.current.freeDrawingBrush.width = brushThickness;
        upperCanvasRef.current.freeDrawingBrush.transparent = brushOpacity;
      } else {
        // Выключение режима рисования при смене инструмента
        upperCanvasRef.current.isDrawingMode = false;

        disableBrushObjectsSelection();
      }

      // Обработчики для рисования
      upperCanvasRef.current.on('mouse:down', handleMouseDown);
      upperCanvasRef.current.on('mouse:move', handleMouseMove);
      upperCanvasRef.current.on('mouse:up', handleMouseUp);

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
      };
    }, [canvasWidth, canvasHeight, canvasBackgroundColor, isResetRequired, setIsResetRequired, brushColor, brushOpacity, brushThickness, currentBrushLayer, currentTool]);

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