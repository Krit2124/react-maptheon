import React from 'react';

import arrowUpImage from "../../assets/icons/ArrowUp.png"
import arrowDownImage from "../../assets/icons/ArrowDown.png"

function ObjectCardOnCanvas() {
    return (
        <div className='objectCard-canvas flex-row-sb-c'>
            <div className='flex-row-sb-c flex-gap-15'>
                <div className='smallObjectPlaceholder'></div>
                <p>Название объекта</p>
            </div>

            <div className='flex-col-c-c'>
                <button className='button-image-placeSwitcher'>
                    <img src={arrowUpImage} alt="Вверх"/>
                </button>

                <button className='button-image-placeSwitcher'>
                    <img src={arrowDownImage} alt="Вниз"/>
                </button>
            </div>
        </div>
    );
}

export default ObjectCardOnCanvas;