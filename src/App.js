import React, { useEffect, useState } from 'react';

import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

import { useUserStore } from 'store/store';

export default function App() {
  const {
    isAuth,
    checkAuth,
  } = useUserStore();

  const navigate = useNavigate();
  const location = useLocation();

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
      navigate(Cookies.get('lastPath'));
    } else if (isTockensChecked && !isAuth) {
      navigate(`/sign/in/`);
    }
  }, [isTockensChecked, isAuth]);

  useEffect(() => {
    if (location.pathname !== '/') {
      Cookies.set('lastPath', location.pathname, { expires: 30 });
    }
  }, [location]);
  
  return (
    <div className='App background-gray-default'>
      <Outlet />
    </div>
  );
}