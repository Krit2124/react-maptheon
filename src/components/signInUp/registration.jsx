import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useUserStore } from 'store/store';

export default function Registration() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const {
        registration,
    } = useUserStore();

    async function handleSubmit(e) {
        e.preventDefault();
        
        if (username === '' || email === '' || password === '' || confirmPassword === '')  {
            toast.error('Все поля обязательны для заполнения');
            return;
        }

        if (password.length < 6 || password.length > 63) {
            toast.error('Пароль должен быть от 6 до 63 символов');
            return;
        }

        let result = await registration(username, email, password);
        console.log(result);
        if (result.isSuccess) {
            return navigate(`/maps/personal/yours/`);
        } else {
            if (result.errors && result.errors.length > 0) {
                // Проверка на конкретную ошибку валидации email
                const emailError = result.errors.find(err => err.path === 'email');
                
                if (emailError) {
                    toast.error(emailError.msg);
                } else {
                    toast.error(result.message);
                }
            } else {
                toast.error(result.message);
            }
        }
    };

    return (
        <div className="flex-col-sb-left flex-gap-30">
            <h1>Регистрация</h1>

            <form className="flex-col-sb-left flex-gap-30" onSubmit={handleSubmit}>
                <div className="flex-col-sb-left flex-gap-15">
                    <input className="textInput-usual" type="text" placeholder="Имя пользователя" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <input className="textInput-usual" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input className="textInput-usual" type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <input className="textInput-usual" type="password" placeholder="Повторите пароль" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
                
                <div className="flex-row-sb-c flex-gap-10">
                    <button type="submit" className="button-text-usual active">Зарегистрироваться</button>
                    <Link to="/sign/in" className="button-text-usual">Вход</Link>
                </div>
            </form>

            <ToastContainer theme="dark"/>
        </div>
    );
}