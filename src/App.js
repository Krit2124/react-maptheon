import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useUserStore } from 'store/store';

export default function App() {
  const {
    isAuth,
    checkAuth,
  } = useUserStore();

  const navigate = useNavigate();

  const [isTockensChecked, setIsTockensChecked] = useState(false);

  // Проверка, зашёл ли пользователь в аккаунт
  useEffect(() => {
    async function handleCheckAuth() {
      await checkAuth();
      setIsTockensChecked(true);
    }

    handleCheckAuth();
  }, []);

  // Если проверка завершена и пользователь аутентифицирован, перенаправляем на нужную страницу
  useEffect(() => {
    if (isTockensChecked && isAuth) {
      console.log('Есть refresh токен');
      navigate(`/maps/personal/yours/`);
    } else if (isTockensChecked && !isAuth) {
      console.log('Нет токенов');
      navigate(`/sign/in/`);
    }
  }, [isTockensChecked, isAuth, navigate]);
  
  return (
    <div className='App background-gray-default'>
    </div>
  );
}