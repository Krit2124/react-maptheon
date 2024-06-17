import React from 'react';

import { useGeneralGraphicEditorStore } from 'store/store';

import closeImage from "../../assets/icons/Close.png"

export default function HotkeysPanel() {
    const { 
        setIsHotkeysPanelVisible,
    } = useGeneralGraphicEditorStore();

    return (
        <div className="popupContainer size-full-vertical-pagePercent size-full-horizontal-pagePercent flex-row-c-c">
            <div className='border-black background-black flex-col-sb-c popupPanel flex-gap-25'>
                <div className='flex-row-sb-c size-full-horizontal-percent'>
                    <h1>Горячие клавиши</h1>

                    <button className='button-image-small' onClick={() => setIsHotkeysPanelVisible(false)}>
                        <img src={closeImage} alt="Закрыть"/>
                    </button>
                </div>
                
                <div className='flex-row-sb-c size-full-horizontal-percent'>
                    <p>Масштабирование</p>
                    <p><strong>Колесо мыши</strong></p>
                </div>

                <div className='flex-row-sb-c size-full-horizontal-percent'>
                    <p>Перемещение холста</p>
                    <p>Зажатие и перетаскивание<strong> Колеса мыши</strong></p>
                </div>

                <div className='flex-row-sb-c size-full-horizontal-percent'>
                    <p>Удаление объекта/подписи</p>
                    <p><strong>Shift + Del</strong> или <strong>Shift + Backspace</strong></p>
                </div>
            </div>
        </div>
    );
}