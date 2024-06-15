import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGeneralGraphicEditorStore } from 'store/store';

import exitImage from "../../assets/icons/Exit.png"
import questionImage from "../../assets/icons/Question.png"
import arrowBackImage from "../../assets/icons/ArrowBack.png"
import arrowForwardImage from "../../assets/icons/ArrowForward.png"
import showOrHideImage from "../../assets/icons/ShowOrHide.png"

export default function GraphicEditorHeader() {
    const navigate = useNavigate();

    const {
        isObjectListVisible, setIsObjectListVisible,
        isHotkeysPanelVisible, setIsHotkeysPanelVisible,
        setIsUndoRequired,
        setIsRedoRequired,
    } = useGeneralGraphicEditorStore();

    const [rotationClass, setRotationClass] = useState('rotate-right');

    let handleObjectListVisibility = () => {
        setIsObjectListVisible(!isObjectListVisible);
        // Поворот стрелки при нажатии
        setRotationClass(rotationClass === 'rotate-right' ? 'rotate-left' : 'rotate-right');
    }

    const handleExit = async () => {
        if (window.confirm("Вы действительно выйти?\nНесохранённые данные будут утеряны")) {
            try {
                navigate('/maps/personal/yours');
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <header className="border-black-bottom background-black header-graphicEditor">
            <div className="flex-row-sb-c">
                <div className="flex-row-sb-c flex-gap-30">
                    <button className="button-image-big" onClick={() => handleExit()}>
                        <img src={exitImage} alt="Выйти из редактора"/>
                    </button>

                    <div className='flex-row-sb-c flex-gap-10'>
                        <button className="button-image-big" onClick={() => setIsUndoRequired(true)}>
                            <img src={arrowBackImage} alt="Отменить"/>
                        </button>
                        <button className="button-image-big" onClick={() => setIsRedoRequired(true)}>
                            <img src={arrowForwardImage} alt="Вернуть"/>
                        </button>
                    </div>
                </div>

                <div className='flex-row-sb-c flex-gap-30'>
                    <button className="button-image-big" onClick={() => setIsHotkeysPanelVisible(!isHotkeysPanelVisible)}>
                        <img src={questionImage} alt="Горячие клавиши"/>
                    </button>

                    <button className="button-image-big" onClick={handleObjectListVisibility}>
                        <img src={showOrHideImage} alt="Отображение списка объектов" className={rotationClass}/>
                    </button>
                </div>
            </div>
        </header>
    );
}