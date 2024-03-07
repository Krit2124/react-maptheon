import MainGraphicEditor from 'components/graphicEditor/mainGraphicEditor';
import React from 'react';

export default function App() {
  // Пеосле реализации бекэнда здесь должна быть обработка того, вошёл ли пользователь в свой аккаунт
  // Если да, то должна быть переадресация на страницу с его картами
  // Если нет, то должна быть переадресация на страницу входа в аккаунт
  
  return (
    <div className="App">
      <MainGraphicEditor />
    </div>
  );
}