import React, { useEffect } from 'react';
import { fabric } from 'fabric';

export default function CanvasComponent() {
  useEffect(() => {
    const upperContainer = document.getElementById('canvasContainer');

    const mainCanvas = new fabric.Canvas('mainCanvas', {
      width: 800,
      height: 600,
      selection: true,
      renderOnAddRemove: true,
      preserveObjectStacking: true,
    });

    const lowerContainer = document.querySelector('.canvas-container');

    var rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20
    });

    mainCanvas.add(rect);

    let isPanning = false;
    let panStart = { x: 0, y: 0 };

    // Обработка изменения холста колёсиком мыши
    const handleMouseWheel = (event) => {
      const delta = event.deltaY;
      let scaleMultiplier = 1.1;

      if (delta < 0) {
        // увеличиваем масштаб при движении вверх
        const currentWidth = mainCanvas.width;
        const currentHeight = mainCanvas.height;

        mainCanvas.setDimensions({
          width: currentWidth * scaleMultiplier,
          height: currentHeight * scaleMultiplier,
        });

        // масштабирование объектов
        mainCanvas.forEachObject((obj) => {
          const objScaleX = obj.scaleX || 1;
          const objScaleY = obj.scaleY || 1;

          const newObjLeft = obj.left * scaleMultiplier;
          const newObjTop = obj.top * scaleMultiplier;

          obj.set({
            left: newObjLeft,
            top: newObjTop,
            scaleX: objScaleX * scaleMultiplier,
            scaleY: objScaleY * scaleMultiplier,
          });
        });
      } else {
        // уменьшаем масштаб при движении вниз
        const currentWidth = mainCanvas.width;
        const currentHeight = mainCanvas.height;

        mainCanvas.setDimensions({
          width: currentWidth / scaleMultiplier,
          height: currentHeight / scaleMultiplier,
        });

        // масштабирование объектов
        mainCanvas.forEachObject((obj) => {
          const objScaleX = obj.scaleX || 1;
          const objScaleY = obj.scaleY || 1;

          const newObjLeft = obj.left / scaleMultiplier;
          const newObjTop = obj.top / scaleMultiplier;

          obj.set({
            left: newObjLeft,
            top: newObjTop,
            scaleX: objScaleX / scaleMultiplier,
            scaleY: objScaleY / scaleMultiplier,
          });
        });
      }

      event.preventDefault();
      event.stopPropagation();
      mainCanvas.renderAll();
    };

    // Перемещение холста при зажатом колёсике мыши
    const handleMouseDown = (event) => {
      if (event.button === 1) {
        isPanning = true;
        panStart = { x: event.clientX, y: event.clientY };
        upperContainer.style.cursor = 'grabbing'; // изменение курсора при перемещении
      }
    };

    const handleMouseMove = (event) => {
      if (isPanning) {
        const deltaX = event.clientX - panStart.x;
        const deltaY = event.clientY - panStart.y;
        panStart = { x: event.clientX, y: event.clientY };

        // @ts-ignore Ошибка здесь возникает из-за того, что .canvas-container создаётся автоматически fabric js
        const currentLeft = parseInt(lowerContainer.style.left || '0');
        // @ts-ignore Ошибка здесь возникает из-за того, что .canvas-container создаётся автоматически fabric js
        const currentTop = parseInt(lowerContainer.style.top || '0');

        // @ts-ignore Ошибка здесь возникает из-за того, что .canvas-container создаётся автоматически fabric js
        lowerContainer.style.left = `${currentLeft + deltaX}px`;
        // @ts-ignore Ошибка здесь возникает из-за того, что .canvas-container создаётся автоматически fabric js
        lowerContainer.style.top = `${currentTop + deltaY}px`;

        mainCanvas.renderAll(); // перерисовка холста
      }
    };

    const handleMouseUp = () => {
      isPanning = false;
      upperContainer.style.cursor = 'grab'; // возврат курсора к исходному состоянию
    };

    upperContainer.addEventListener('wheel', handleMouseWheel);
    upperContainer.addEventListener('mousedown', handleMouseDown);
    upperContainer.addEventListener('mousemove', handleMouseMove);
    upperContainer.addEventListener('mouseup', handleMouseUp);

    return () => {
      upperContainer.removeEventListener('wheel', handleMouseWheel);
      upperContainer.removeEventListener('mousedown', handleMouseDown);
      upperContainer.removeEventListener('mousemove', handleMouseMove);
      upperContainer.removeEventListener('mouseup', handleMouseUp);
      mainCanvas.dispose();
    };
  }, []);

  return (
    <div id="canvasContainer" className='canvasContainer'>
      <canvas id="mainCanvas" />
    </div>
  );
}