import React from 'react';

import userWithoutAvatarImage from "../assets/UserWithoutAvatar.png"

function UserSettingsPage() {
    return (
        <section className="background-gray-default">
            <div className="container flex-col-c-c userSettingsContainer">
                <form className='flex-col-c-c flex-gap-30 userSettingsContent'>
                    <div className='flex-row-sb-c flex-gap-20 allSizeElement'>
                        <img src={userWithoutAvatarImage} alt="Аватар" />

                        <div className='flex-col-sb-left flex-gap-10 allSizeElement'>
                            <label htmlFor="username">Имя пользователя:</label>
                            <input className="textInput-usual allSizeElement" type="text" id='username'/>
                        </div>
                    </div>

                    <div className='flex-col-sb-left flex-gap-10 allSizeElement'>
                        <label htmlFor="userDescription">Описание профиля:</label>
                        <input className="textInput-usual allSizeElement allSizeElement" type="text" id='userDescription'/>
                    </div>

                    <div className='flex-row-sb-c allSizeElement'>
                        <div className='flex-row-sb-c flex-gap-20'>
                            <p>Email:</p>
                            <p>EmailExample@example.com</p>
                        </div>

                        <button className="button-text-usual">Сбросить пароль</button>
                    </div>

                    <button type="submit" className="button-text-usual active">Сохранить</button>
                </form>
            </div>
        </section>
    );
}

export default UserSettingsPage;