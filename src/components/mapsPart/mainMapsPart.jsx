import React from 'react';

import { Outlet } from "react-router-dom";

import Header from './header';

export default function MainMapsPart() {
    return (
        <div className="App">
            <Header />

            <Outlet />
        </div>
    );
}