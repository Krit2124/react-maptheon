import React, { useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';

export default function CanvasComponent({ canvasWidth, canvasHeight, filterIntensity, isResetRequired, setIsResetRequired, canvasBackgroundColor, selectedFilter }) {
  const [mainCanvas, setMainCanvas] = useState(null);
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = new fabric.Canvas('mainCanvas', {
      width: canvasWidth,
      height: canvasHeight,
      selection: true,
      renderOnAddRemove: true,
      preserveObjectStacking: true,
      backgroundColor: canvasBackgroundColor,
    });

    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20,
    });

    canvas.add(rect);

    const upperContainer = document.getElementById('canvasContainer');
    const lowerContainer = document.querySelector('.canvas-container');

    // Обработка изменения масштаба холста колесиком мыши
    const handleMouseWheel = (event) => {
      const delta = event.deltaY;
      const scaleMultiplier = 1.1;
      const direction = delta < 0 ? 1 : -1;  // 1 для приближения, -1 для отдаления
      const scale = Math.pow(scaleMultiplier, direction);

      const currentWidth = canvas.width;
      const currentHeight = canvas.height;

      const newWidth = currentWidth * scale;
      const newHeight = currentHeight * scale;

      canvas.setDimensions({
        width: newWidth,
        height: newHeight,
      });

      canvas.forEachObject((obj) => {
        const objScaleX = obj.scaleX || 1;
        const objScaleY = obj.scaleY || 1;

        obj.set({
          left: obj.left * scale,
          top: obj.top * scale,
          scaleX: objScaleX * scale,
          scaleY: objScaleY * scale,
        });
      });

      event.preventDefault();
      event.stopPropagation();
      canvas.renderAll();
    };
    
    // Перемещение холста при зажатом колесике мыши
    const handleMouseDown = (event) => {
      if (event.button === 1) {
        isPanningRef.current = true;
        panStartRef.current = { x: event.clientX, y: event.clientY };
        upperContainer.style.cursor = 'grabbing'; // изменение курсора при перемещении
      }
    };

    // Обработка перемещения холста
    const handleMouseMove = (event) => {
      if (isPanningRef.current) {
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

        requestAnimationFrame(() => canvas.renderAll());
      }
    };

    // Завершение перемещения холста
    const handleMouseUp = () => {
      isPanningRef.current = false;
      upperContainer.style.cursor = 'grab'; // возврат курсора к исходному состоянию
    };

    // Добавляем обработчики событий
    upperContainer.addEventListener('wheel', handleMouseWheel);
    upperContainer.addEventListener('mousedown', handleMouseDown);
    upperContainer.addEventListener('mousemove', handleMouseMove);
    upperContainer.addEventListener('mouseup', handleMouseUp);

    // Сброс масштабирования
    if (isResetRequired) {
      canvas.setDimensions({
        width: canvasWidth,
        height: canvasHeight,
      });
      setIsResetRequired(false);
    }

    setMainCanvas(canvas);

    // Очистка ресурсов и удаление обработчиков событий при размонтировании
    return () => {
      upperContainer.removeEventListener('wheel', handleMouseWheel);
      upperContainer.removeEventListener('mousedown', handleMouseDown);
      upperContainer.removeEventListener('mousemove', handleMouseMove);
      upperContainer.removeEventListener('mouseup', handleMouseUp);
      canvas.dispose();
    };
  }, [canvasWidth, canvasHeight, isResetRequired, setIsResetRequired, canvasBackgroundColor, selectedFilter]);

  return (
    <div id="canvasContainer" className='canvasContainer'>
      <canvas id="mainCanvas" />
    </div>
  );
}