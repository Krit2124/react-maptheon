import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

export default function CanvasComponent({ currentTool, canvasWidth, canvasHeight, filterIntensity, isResetRequired, setIsResetRequired, canvasBackgroundColor, selectedFilter }) {
  // Состояния для перемещения и масштабирования холста
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);

  // Состояния для рисования
  const [isDrawing, setIsDrawing] = useState(false);
  const [path, setPath] = useState(null);
  const pencilToolRef = useRef(null);

  const canvasRef = useRef(null);

  const initializeBrushDrawing = () => {
    const canvas = canvasRef.current;

    // Убедимся, что предыдущий инструмент Pencil удален
    if (pencilToolRef.current) {
      canvas.remove(pencilToolRef.current);
      pencilToolRef.current = null;
    }

    // Создаем новый инструмент Pencil
    pencilToolRef.current = new fabric.PencilBrush(canvas);

    // Устанавливаем параметры для инструмента Pencil
    pencilToolRef.current.color = 'black';
    pencilToolRef.current.width = 5;

    // Включаем режим рисования
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush = pencilToolRef.current;
  };

  useEffect(() => {
    const handleMouseDown = (event) => {
      if (currentTool !== "Brush") return;

      setIsDrawing(true);

      const pointer = canvasRef.current.getPointer(event.e);
      const newPath = new fabric.Path(`M ${pointer.x} ${pointer.y}`, {
        fill: 'transparent',
        stroke: 'black',
        strokeWidth: 5,
        strokeLineCap: 'round',
        strokeLineJoin: 'round',
      });

      setPath(newPath);
      canvasRef.current.add(newPath);
    };

    const handleMouseMove = (event) => {
      if (!isDrawing || currentTool !== "Brush") return;

      const pointer = canvasRef.current.getPointer(event.e);
      const pathData = `${path.path[0][1]} ${path.path[0][2]} L ${pointer.x} ${pointer.y}`;
      path.set({ path: new fabric.Path(pathData).path });
      canvasRef.current.renderAll();
    };

    const handleMouseUp = () => {
      if (currentTool !== "Brush") return;

      setIsDrawing(false);
    };

    // Инициализация холста, если его ещё нет
    if (canvasRef.current == null) {
      const canvas = new fabric.Canvas('mainCanvas', {
        width: canvasWidth,
        height: canvasHeight,
        selection: true,
        renderOnAddRemove: true,
        preserveObjectStacking: true,
      });

      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 50,
        height: 50,
      });

      canvas.add(rect);

      canvasRef.current = canvas;

      // Обработчики для рисования
      canvasRef.current.on('mouse:down', handleMouseDown);
      canvasRef.current.on('mouse:move', handleMouseMove);
      canvasRef.current.on('mouse:up', handleMouseUp);
    } else {
      // Обновление свойств canvas при изменении
      canvasRef.current.setWidth(canvasWidth, canvasRef.current.renderAll.bind(canvasRef.current))
      canvasRef.current.setHeight(canvasHeight, canvasRef.current.renderAll.bind(canvasRef.current))
      canvasRef.current.setBackgroundColor(canvasBackgroundColor, canvasRef.current.renderAll.bind(canvasRef.current));
    }

    let upperContainer = document.getElementById('canvasContainer');

    // Обработка изменения масштаба холста колесиком мыши
    const handleMouseWheel = (event) => {
      const delta = event.deltaY;
      const scaleMultiplier = 1.1;
      const direction = delta < 0 ? 1 : -1;  // 1 для приближения, -1 для отдаления

      // Обновляем коэффициент масштабирования
      scaleRef.current *= Math.pow(scaleMultiplier, direction);

      applyScale(); // Применяем масштабирование
    };

    // Применение масштабирования ко всем объектам на холсте
    const applyScale = () => {
      const currentWidth = canvasRef.current.width;
      const currentHeight = canvasRef.current.height;

      const newWidth = canvasWidth * scaleRef.current;
      const newHeight = canvasHeight * scaleRef.current;

      canvasRef.current.setDimensions({
        width: newWidth,
        height: newHeight,
      });

      canvasRef.current.forEachObject((obj) => {
        const objScaleX = obj.scaleX || 1;
        const objScaleY = obj.scaleY || 1;

        obj.set({
          left: (obj.left / currentWidth) * newWidth,
          top: (obj.top / currentHeight) * newHeight,
          scaleX: objScaleX * (newWidth / currentWidth),
          scaleY: objScaleY * (newHeight / currentHeight),
        });

        obj.setCoords();
      });

      canvasRef.current.renderAll();
    };
    
    // Перемещение холста при зажатом колесике мыши
    const handleWheelDown = (event) => {
      if (event.button === 1) {
        isPanningRef.current = true;
        panStartRef.current = { x: event.clientX, y: event.clientY };
        upperContainer.style.cursor = 'grabbing'; // изменение курсора при перемещении
      }
    };

    // Обработка перемещения холста
    const handleWheelMove = (event) => {
      if (isPanningRef.current) {
        let lowerContainer = document.querySelector('.canvas-container');

        const deltaX = event.clientX - panStartRef.current.x;
        const deltaY = event.clientY - panStartRef.current.y;
        panStartRef.current = { x: event.clientX, y: event.clientY };

        // @ts-ignore Ошибка здесь возникает из-за того, что .canvas-container создаётся автоматически fabric js
        const currentLeft = parseInt(lowerContainer.style.left || '0', 10);
        // @ts-ignore Ошибка здесь возникает из-за того, что .canvas-container создаётся автоматически fabric js
        const currentTop = parseInt(lowerContainer.style.top || '0', 10);

        // @ts-ignore Ошибка здесь возникает из-за того, что .canvas-container создаётся автоматически fabric js
        lowerContainer.style.left = `${currentLeft + deltaX}px`;
        // @ts-ignore Ошибка здесь возникает из-за того, что .canvas-container создаётся автоматически fabric js
        lowerContainer.style.top = `${currentTop + deltaY}px`;

        requestAnimationFrame(() => canvasRef.current.renderAll());
      }
    };

    // Завершение перемещения холста
    const handleWheelUp = () => {
      isPanningRef.current = false;
      upperContainer.style.cursor = 'grab'; // возврат курсора к исходному состоянию
    };

    // Добавляем обработчики событий
    upperContainer.addEventListener('wheel', handleMouseWheel);
    upperContainer.addEventListener('mousedown', handleWheelDown);
    upperContainer.addEventListener('mousemove', handleWheelMove);
    upperContainer.addEventListener('mouseup', handleWheelUp);

    // Сброс масштабирования
    if (isResetRequired) {
      scaleRef.current = 1;
      applyScale(); // Применяем масштабирование
      setIsResetRequired(false);
    }

    // Установка обработчиков рисования кистью при смене инструмента
    if (currentTool === "Brush") {
      initializeBrushDrawing();
    } else {
      // Выключение режима рисования при смене инструмента
      canvasRef.current.isDrawingMode = false;
    }

    // Очистка ресурсов и удаление обработчиков событий при размонтировании
    return () => {
      upperContainer.removeEventListener('wheel', handleMouseWheel);
      upperContainer.removeEventListener('mousedown', handleWheelDown);
      upperContainer.removeEventListener('mousemove', handleWheelMove);
      upperContainer.removeEventListener('mouseup', handleWheelUp);

      canvasRef.current.off('mouse:down', handleMouseDown);
      canvasRef.current.off('mouse:move', handleMouseMove);
      canvasRef.current.off('mouse:up', handleMouseUp);
      // canvasRef.current.dispose();
    };
  }, [currentTool, canvasWidth, canvasHeight, isResetRequired, setIsResetRequired, canvasBackgroundColor]);

  return (
    <div id="canvasContainer" className='canvasContainer'>
      <canvas id="mainCanvas" />
    </div>
  );
}