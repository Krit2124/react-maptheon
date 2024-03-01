import React from 'react';

import closeImage from "../../assets/icons/Close.png"

export default function ObjectsLibraryHeader() {
    return (
        <header className="border-black-bottom background-black">
            <div className="container flex-row-sb-c">
                <div className='flex-row-sb-c flex-gap-10'>
                    <button className="button-text-usual">Официальные</button>
                    <button className="button-text-usual active">Публичные</button>
                    <button className="button-text-usual">Личные</button>
                </div>

                <div className='flex-row-sb-c flex-gap-10'>
                    <button className="button-text-usual">Создать подборку</button>
                    <button className="button-text-usual">Загрузить объект</button>
                </div>

                <button className="button-image-big">
                    <img src={closeImage} alt="Выйти из редактора"/>
                </button>
            </div>
        </header>
    );
}