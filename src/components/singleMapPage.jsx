import React, { useState } from 'react';

import favouriteImage from "../assets/icons/Favourite.png";
import notFavouriteImage from "../assets/icons/NotFavourite.png";

function SingleMapPage() {
    const [isFavourite, setIsFavourite] = useState(false);

    const switchToFavourite = () => {
        setIsFavourite(!isFavourite);
    };

    return (
        <section className="background-gray-default size-full-vertical-pagePercent-withHeader">
            <div className="container">
                <div className='flex-col-sb-c flex-gap-20'>                  
                    <div className='flex-row-sb-c size-full-horizontal-percent'>
                        <div className='flex-col-sb-left flex-gap-20'>
                            <h1>Название карты</h1>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque qui eum facere labore exercitationem excepturi quae aperiam veritatis molestiae dolorum, aliquam odio voluptatum harum provident odit ab molestias nulla cupiditate?</p>
                        </div>

                        <div className='flex-col-sb-right flex-gap-10'>
                            <div className="flex-row-sb-c flex-gap-10" onClick={switchToFavourite}>
                                <p>34634</p>
                                <img src={isFavourite ? favouriteImage : notFavouriteImage} alt="Избранное" className="size-image-small"/>
                            </div>
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

export default SingleMapPage;