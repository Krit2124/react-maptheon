import React from 'react';

import {Link} from "react-router-dom";
import Authorization from "./authorization";
import Registration from "./registration";

import logoImage from "../assets/Logo.png";

function SignInUpPanel() {
    return (
        <div className="signInUpContainer container flex-gap-50 flex-col-sb-left">
            <Link to="/personalMaps" className="logo">
                <img src={logoImage} alt="logo"/>
            </Link>

            {/* <Authorization /> */}
            <Registration />
        </div>
    );
}

export default SignInUpPanel;