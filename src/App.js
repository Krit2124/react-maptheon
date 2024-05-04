import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useUserStore } from 'store/store';

export default function App() {
  const {
    checkAuth,
  } = useUserStore();

  const navigate = useNavigate();

  // Проверка, зашёл ли пользователь в аккаунт
  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth();
      return navigate(`/maps/personal/yours/`);
    } else {
      return navigate(`/sign/in/`);
    }
}, [checkAuth, navigate])
  
  return (
    <div className="App">
    </div>
  );
}