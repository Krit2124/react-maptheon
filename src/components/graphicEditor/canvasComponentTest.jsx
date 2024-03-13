import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';

export default function CanvasComponentTest({ currentTool, 
  brushColor, currentBrushLayer, brushThickness, brushOpacity, brushSoftness,
  canvasWidth, canvasHeight, filterIntensity, isResetRequired, setIsResetRequired, canvasBackgroundColor, selectedFilter }) {
    const lowerCanvasRef = useRef(null);
    const middleCanvasRef = useRef(null);
    const upperCanvasRef = useRef(null);
  
    useEffect(() => {
      // Создание нижнего холста
      const lowerCanvas = new fabric.Canvas(lowerCanvasRef.current, {
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: '#252525',
        containerClass: 'canvas-lower-container'
      });
  
      // Создание среднего холста
      const middleCanvas = new fabric.Canvas(middleCanvasRef.current, {
        width: window.innerWidth,
        height: window.innerHeight,
        containerClass: 'canvas-middle-container'
      });
  
      // Создание верхнего холста
      const upperCanvas = new fabric.Canvas(upperCanvasRef.current, {
        width: window.innerWidth,
        height: window.innerHeight,
        containerClass: 'canvas-upper-container'
      });

      const workingArea = new fabric.Rect({
        left: (lowerCanvas.width - canvasWidth) / 2,
        top: (lowerCanvas.height - canvasHeight) / 2,
        width: canvasWidth,
        height: canvasHeight,
        fill: '#ffffff',
        selectable: false,
        evented: false,
      });

      lowerCanvas.add(workingArea);

      // Настройка наслаивания холстов друг на друга
      let lowerContainer = document.querySelector('.canvas-lower-container');
      // @ts-ignore
      lowerContainer.style.position = 'absolute';
      // @ts-ignore
      lowerContainer.style.width = '100%';
      // @ts-ignore
      lowerContainer.style.height = '100%';

      let middleContainer = document.querySelector('.canvas-middle-container');
      // @ts-ignore
      middleContainer.style.width = '100%';
      // @ts-ignore
      middleContainer.style.height = '100%';
      // @ts-ignore
      middleContainer.style.position = 'absolute';

      let upperContainer = document.querySelector('.canvas-upper-container');
      // @ts-ignore
      upperContainer.style.position = 'absolute';
      // @ts-ignore
      upperContainer.style.width = '100%';
      // @ts-ignore
      upperContainer.style.height = '100%';

      // Обработчики событий для масштабирования и перемещения
      const mainContainer = document.getElementById('canvasContainer');
      mainContainer.addEventListener('wheel', handleMouseWheel);
      mainContainer.addEventListener('mousedown', handleMouseDown);
      mainContainer.addEventListener('mousemove', handleMouseMove);
      mainContainer.addEventListener('mouseup', handleMouseUp);

      function handleMouseWheel(event) {
        const delta = event.deltaY;
        const zoom = lowerCanvas.getZoom();
        const zoomFactor = 0.999 ** delta;
        const newZoom = zoom * zoomFactor;
        if (newZoom > 20) return;
        if (newZoom < 0.01) return;
        
        lowerCanvas.zoomToPoint({ x: event.offsetX, y: event.offsetY }, newZoom);
        middleCanvas.zoomToPoint({ x: event.offsetX, y: event.offsetY }, newZoom);
        upperCanvas.zoomToPoint({ x: event.offsetX, y: event.offsetY }, newZoom);

        event.preventDefault();
      }

      let isDragging = false;
      let lastPosX = 0;
      let lastPosY = 0;

      function handleMouseDown(event) {
        if (event.button === 1) {
          isDragging = true;
          lowerCanvas.selection = false;
          lastPosX = event.clientX;
          lastPosY = event.clientY;
        }
      }

      function handleMouseMove(event) {
        if (isDragging) {
          const e = event;
          const vpt = lowerCanvas.viewportTransform;
          vpt[4] += e.clientX - lastPosX;
          vpt[5] += e.clientY - lastPosY;

          lowerCanvas.requestRenderAll();
          middleCanvas.requestRenderAll();
          upperCanvas.requestRenderAll();

          lastPosX = e.clientX;
          lastPosY = e.clientY;
        }
      }

      function handleMouseUp(event) {
        lowerCanvas.setViewportTransform(lowerCanvas.viewportTransform);
        middleCanvas.setViewportTransform(middleCanvas.viewportTransform);
        upperCanvas.setViewportTransform(upperCanvas.viewportTransform);

        isDragging = false;
        lowerCanvas.selection = true;
      }
  
      return () => {
        // Удаление обработчиков событий при размонтировании компонента
        mainContainer.removeEventListener('wheel', handleMouseWheel);
        mainContainer.removeEventListener('mousedown', handleMouseDown);
        mainContainer.removeEventListener('mousemove', handleMouseMove);
        mainContainer.removeEventListener('mouseup', handleMouseUp);
      };
    }, [canvasWidth, canvasHeight]);

    
  
    return (
      <div id="canvasContainer" className="canvasContainer">
        {/* Нижний холст */}
        <canvas ref={lowerCanvasRef} className="canvas-lower" />
        {/* Средний холст */}
        <canvas ref={middleCanvasRef} className="canvas-middle" />
        {/* Верхний холст */}
        <canvas ref={upperCanvasRef} className="canvas-upper" />
      </div>
    );
  }