import React from 'react';

import exitImage from "../assets/icons/Exit.png"
import arrowBackImage from "../assets/icons/ArrowBack.png"
import arrowForwardImage from "../assets/icons/ArrowForward.png"
import showOrHideImage from "../assets/icons/ShowOrHide.png"

function GraphicEditorHeader() {
    return (
        <header className="border-black-bottom background-black">
            <div className="flex-row-sb-c">
                <div className="flex-row-sb-c flex-gap-30">
                    <button className="button-image-big">
                        <img src={exitImage} alt="Выйти из редактора"/>
                    </button>

                    <div className='flex-row-sb-c flex-gap-10'>
                        <button className="button-image-big">
                            <img src={arrowBackImage} alt="Отменить"/>
                        </button>
                        <button className="button-image-big">
                            <img src={arrowForwardImage} alt="Вернуть"/>
                        </button>
                    </div>
                </div>

                <button className="button-image-big">
                    <img src={showOrHideImage} alt="Отображение слоёв" className='rotate-right'/>
                </button>
            </div>
        </header>
    );
}

export default GraphicEditorHeader;