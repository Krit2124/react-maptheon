import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import exitImage from "../../assets/icons/Exit.png"
import arrowBackImage from "../../assets/icons/ArrowBack.png"
import arrowForwardImage from "../../assets/icons/ArrowForward.png"
import showOrHideImage from "../../assets/icons/ShowOrHide.png"
import { useGeneralGraphicEditorStore } from 'store/store';

export default function GraphicEditorHeader() {
    const {
        isObjectListVisible,
        setIsObjectListVisible,
        setIsUndoRequired,
        setIsRedoRequired,
    } = useGeneralGraphicEditorStore();

    const [rotationClass, setRotationClass] = useState('rotate-right');

    let handleObjectListVisibility = () => {
        setIsObjectListVisible(!isObjectListVisible);
        // Поворот стрелки при нажатии
        setRotationClass(rotationClass === 'rotate-right' ? 'rotate-left' : 'rotate-right');
    }

    return (
        <header className="border-black-bottom background-black header-graphicEditor">
            <div className="flex-row-sb-c">
                <div className="flex-row-sb-c flex-gap-30">
                    <Link to="/maps/personal/yours" className="button-image-big">
                        <img src={exitImage} alt="Выйти из редактора"/>
                    </Link>

                    <div className='flex-row-sb-c flex-gap-10'>
                        <button className="button-image-big" onClick={() => setIsUndoRequired(true)}>
                            <img src={arrowBackImage} alt="Отменить"/>
                        </button>
                        <button className="button-image-big" onClick={() => setIsRedoRequired(true)}>
                            <img src={arrowForwardImage} alt="Вернуть"/>
                        </button>
                    </div>
                </div>

                {/* Кнопка для скрытия или показа панели со списком объектов */}
                <button className="button-image-big" onClick={handleObjectListVisibility}>
                    <img src={showOrHideImage} alt="Отображение слоёв" className={rotationClass}/>
                </button>
            </div>
        </header>
    );
}