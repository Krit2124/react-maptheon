import React, { useEffect } from 'react';
import { fabric } from 'fabric';

export default function CanvasComponent() {
  useEffect(() => {
    const mainCanvas = new fabric.Canvas('mainCanvas', {
        width: 800,
        height: 600,
        selection: true,
        renderOnAddRemove: true,
        preserveObjectStacking: true,
    });
  
    // Масштабирование
    mainCanvas.on('mouse:wheel', (event) => {
        const delta = event.e.deltaY;
        let zoom = mainCanvas.getZoom();
        zoom = zoom + delta / 1000;
        if (zoom > 10) zoom = 10;
        if (zoom < 0.1) zoom = 0.1;
        mainCanvas.zoomToPoint({ x: event.e.offsetX, y: event.e.offsetY }, zoom);
        event.e.preventDefault();
        event.e.stopPropagation();
    });

    return () => {
      // Очистка ресурсов при размонтировании компонента
      mainCanvas.dispose();
    };
  }, []);

  return (
    <div className='canvasContainer'>
      <canvas id="mainCanvas" />
    </div>
  );
};