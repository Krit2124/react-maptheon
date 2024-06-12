import React from 'react';

import { Link, NavLink, useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';

import { useUserStore } from 'store/store';

import logoImage from "../../assets/Logo.png"
import personalMapsImage from "../../assets/icons/PersonalMaps.png"
import publicMapsImage from "../../assets/icons/PublicMaps.png"
import userImage from "../../assets/icons/User.png"

export default function Header() {
    const navigate = useNavigate();

    const {
        logout,
        user,
    } = useUserStore();

    return (
        <header className="border-black-bottom background-black">
            <div className="container flex-row-sb-c">
                <div className="flex-row-sb-c flex-gap-40">
                    <Link to="/maps/personal/yours" className="logo">
                        <img src={logoImage} alt="Логотип"/>
                    </Link>
                    
                    <NavLink to="/maps/personal/yours" className="button-image-big">
                        <img src={personalMapsImage} alt="Ваши карты" />
                    </NavLink>

                    <NavLink to="/maps/public" className="button-image-big">
                        <img src={publicMapsImage} alt="Карты сообщества" />
                    </NavLink>
                </div>
                
                <Dropdown className="flex-col-sb-right white-border-when-active" align="end">
                    <Dropdown.Toggle variant="success" className="button-image-big" id="dropdown-basic">
                        <img src={userImage} alt="Действия с аккаунтом" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="flex-col-sb-right">
                        <Dropdown.Item onClick={() => navigate(`/maps/profileSettings/0`)}>
                            <p>Настройки (в разработке)</p>
                        </Dropdown.Item>

                        <Dropdown.Item onClick={() => navigate(`/maps/user/${user.id}`)}>
                            <p>Профиль</p>
                        </Dropdown.Item>

                        <Dropdown.Item onClick={() => {
                            navigate(`/sign/in/`);
                            logout();
                        }}>
                            <p>Выход</p>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </header>
    );
}