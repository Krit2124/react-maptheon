import React from 'react';

import { Link, NavLink, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

import SearchField from "../sharedElements/searchField";

export default function PersonalMapsPage() {
    return (
        <section className="background-gray-default">
            <div className="container">
                <div className="flex-row-sb-c flex-gap-20">
                    <div className="flex-row-sb-c flex-gap-10">
                        <NavLink to="/maps/personal/yours" className="button-text-usual">Ваши карты</NavLink>

                        <NavLink to="/maps/personal/favourite" className="button-text-usual">Избранное</NavLink>
                    </div>

                    <SearchField />

                    <Link onClick={() => Cookies.remove('idEditingMap')} to="/editor" className="button-text-usual">Создать карту</Link>
                </div>
            </div>

            <div className="container">
                <Outlet />
            </div>
        </section>
    );
}