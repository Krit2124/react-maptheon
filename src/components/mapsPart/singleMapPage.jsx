import React from 'react';
import { Link } from 'react-router-dom';

import LikeCounter from '../sharedElements/likeCounter';

export default function SingleMapPage() {
    return (
        <section className="background-gray-default size-full-vertical-pagePercent-withHeader">
            <div className="container">
                <div className='flex-col-sb-c flex-gap-20'>                  
                    <div className='flex-row-sb-c size-full-horizontal-percent'>
                        <div className='flex-col-sb-left flex-gap-20'>
                            <div className='flex-row-left-c flex-gap-5'>
                                <h1>Название карты от </h1>
                                <Link to="/maps/user">
                                    <h1 className='underline'>Имя пользователя</h1>
                                </Link>
                            </div>
                            
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque qui eum facere labore exercitationem excepturi quae aperiam veritatis molestiae dolorum, aliquam odio voluptatum harum provident odit ab molestias nulla cupiditate?</p>
                        </div>

                        <div className='flex-col-sb-right flex-gap-10'>
                            <LikeCounter likeAmount="34634" wasFavourite={false} />
                            <button className="button-text-usual">Клонировать</button>
                            <button className="button-text-usual">Скачать изображение</button>
                        </div>
                    </div>

                    <div className="mapCardBigPlaceholder"></div>

                    <div className='flex-row-sb-c size-full-horizontal-percent'>
                        <div className='flex-row-sb-c flex-gap-15'>
                            <div className='tagBox'>
                                <p>Тег 1</p>
                            </div>
                            <div className='tagBox'>
                                <p>Тег 2</p>
                            </div>
                            <div className='tagBox'>
                                <p>Тег 3</p>
                            </div>
                            <div className='tagBox'>
                                <p>Тег 4</p>
                            </div>
                        </div>
                        
                        <p>26.02.2024</p>
                    </div>
                </div>
            </div>
        </section>
    );
}