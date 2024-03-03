import React from 'react';

import { Link } from 'react-router-dom';

export default function Registration() {
    return (
        <div className="flex-col-sb-left flex-gap-30">
            <h1>Регистрация</h1>

            <form className="flex-col-sb-left flex-gap-30">
                <div className="flex-col-sb-left flex-gap-15">
                    <input className="textInput-usual" type="email" placeholder="Email"/>
                    <input className="textInput-usual" type="password" placeholder="Пароль"/>
                    <input className="textInput-usual" type="password" placeholder="Повторите пароль"/>
                </div>
                
                <div className="flex-row-sb-c flex-gap-10">
                    <button type="submit" className="button-text-usual active">Зарегистрироваться</button>
                    <Link to="/sign/in" className="button-text-usual">Вход</Link>
                </div>
            </form>
        </div>
    );
}