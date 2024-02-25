import React from 'react';

import SearchField from "./searchField";
import MapCardList from './mapCardList';

import userWithoutAvatarImage from "../assets/UserWithoutAvatar.png"

function UserMapsPage() {
    return (
        <section className="background-gray-default">
            <div className="container">
                <div className='flex-row-c-c flex-gap-40'>
                    <img src={userWithoutAvatarImage} alt="Аватар" />
                    
                    <div className='flex-col-sb-left flex-gap-10'>
                        <h1>Имя пользователя</h1>
                        <p>Описание профиля</p>
                    </div>
                </div>
            </div>

            <div className="container">
                <SearchField />
            </div>

            <div className="container">
                <MapCardList />
            </div>
        </section>
    );
}

export default UserMapsPage;