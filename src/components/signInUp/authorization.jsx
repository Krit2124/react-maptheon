import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Authorization() {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit (e) {
        e.preventDefault();
        
        await axios.post('http://localhost:3051/login', {emailOrUsername, password}).then((data)=>{
            // При успехе
            return navigate(`/maps/personal/yours/`);
        }).catch((e)=> {
            // При ошибке
            const status = e.response.status;
            switch (status) {
                case 401:
                    toast.error(e.response.data.message);
                    break;

                case 500:
                    toast.error(e.response.data.message);
                    break;

                default:
                    break;
            }
        })
    };

    return (
        <div className="flex-col-sb-left flex-gap-30">
            <h1>Авторизация</h1>

            <form className="flex-col-sb-left flex-gap-30" onSubmit={handleSubmit}>
                <div className="flex-col-sb-left flex-gap-15">
                    <input
                        className="textInput-usual"
                        type="text"
                        placeholder="Email или логин"
                        value={emailOrUsername}
                        onChange={(e) => setEmailOrUsername(e.target.value)}
                    />
                    <input
                        className="textInput-usual"
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                
                <div className="flex-row-sb-c flex-gap-10">
                    <button type="submit" className="button-text-usual active">Войти</button>
                    <Link to="/sign/up" className="button-text-usual">Регистрация</Link>
                </div>
            </form>

            <ToastContainer theme="dark"/>
        </div>
    );
}