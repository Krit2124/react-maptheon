import React from 'react';

function Authorization() {
    return (
        <div className="flex-col-sb-left flex-gap-30">
            <h1>Авторизация</h1>

            <form className="flex-col-sb-left flex-gap-30">
                <div className="flex-col-sb-left flex-gap-15">
                    <input className="textInput-usual" type="email" placeholder="Email"/>
                    <input className="textInput-usual" type="password" placeholder="Пароль"/>
                </div>
                
                <div className="flex-row-sb-c flex-gap-10">
                    <button type="submit" className="button-text-usual active">Войти</button>
                    <button className="button-text-usual">Регистрация</button>
                </div>
            </form>
        </div>
    );
}

export default Authorization;