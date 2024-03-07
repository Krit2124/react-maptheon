import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    <div className="App">
      <section className="background-black size-full-vertical-pagePercent flex-col-c-c flex-gap-15">
        <h1>Произошла неожиданная ошибка</h1>
        <Link to="#" className='button-text-usual' onClick={() => window.history.back()}>
          Вернуться назад
        </Link>
      </section>
    </div>
  );
}