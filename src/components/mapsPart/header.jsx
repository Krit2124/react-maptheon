import React from 'react';

import { Link, NavLink } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';

import logoImage from "../../assets/Logo.png"
import personalMapsImage from "../../assets/icons/PersonalMaps.png"
import publicMapsImage from "../../assets/icons/PublicMaps.png"
import userImage from "../../assets/icons/User.png"

export default function Header() {
    return (
        <header className="border-black-bottom background-black">
            <div className="container flex-row-sb-c">
                <div className="flex-row-sb-c flex-gap-40">
                    <Link to="/signIn" className="logo">
                        <img src={logoImage} alt="Логотип"/>
                    </Link>
                    
                    <NavLink to="/personalMaps" className="button-image-big">
                        <img src={personalMapsImage} alt="Ваши карты" />
                    </NavLink>

                    <NavLink to="/publicMaps" className="button-image-big">
                        <img src={publicMapsImage} alt="Карты сообщества" />
                    </NavLink>
                </div>
                
                <Dropdown className="flex-col-sb-right white-border-when-active" align="end">
                    <Dropdown.Toggle variant="success" className="button-image-big" id="dropdown-basic">
                        <img src={userImage} alt="Действия с аккаунтом" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="flex-col-sb-right">
                        <Dropdown.Item href="/settings">Настройки</Dropdown.Item>
                        <Dropdown.Item href="/profile">Профиль</Dropdown.Item>
                        <Dropdown.Item href="/logout">Выход</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </header>
    );
}