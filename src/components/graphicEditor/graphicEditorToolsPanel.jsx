import React from 'react';

import cursorImage from "../../assets/icons/Cursor.png"
import brushImage from "../../assets/icons/Brush.png"
import objectImage from "../../assets/icons/Object.png"
import textImage from "../../assets/icons/Text.png"
import canvasImage from "../../assets/icons/Canvas.png"
import downloadImage from "../../assets/icons/Download.png"
import saveImage from "../../assets/icons/Save.png"

function GraphicEditorToolsPanel() {
    return (
        <div className="border-black-right background-black flex-col-sb-c canvasPanel size-full-vertical-pagePercent-withHeader">
            <div className="flex-col-sb-c flex-gap-10">
                <button className="button-image-big">
                    <img src={cursorImage} alt="Курсор"/>
                </button>

                <button className="button-image-big">
                    <img src={brushImage} alt="Кисть"/>
                </button>

                <button className="button-image-big">
                    <img src={objectImage} alt="Объект"/>
                </button>

                <button className="button-image-big">
                    <img src={textImage} alt="Подпись"/>
                </button>

                <button className="button-image-big">
                    <img src={canvasImage} alt="Холст"/>
                </button>
            </div>

            <div className="flex-col-sb-c flex-gap-10">
                <button className="button-image-big">
                    <img src={downloadImage} alt="Курсор"/>
                </button>
                <button className="button-image-big">
                    <img src={saveImage} alt="Курсор"/>
                </button>
            </div>
        </div>
    );
}

export default GraphicEditorToolsPanel;