import React from 'react';

import {Link} from "react-router-dom";
import Authorization from "./authorization";
import Registration from "./registration";

import logoImage from "../../assets/Logo.png";

export default function SignInUpPage() {
    return (
        <section className="background-beige size-full-vertical-pagePercent flex-col-c-c">
            <div className="signInUpContainer container flex-gap-50 flex-col-sb-left">
                <Link to="/personalMaps" className="logo">
                    <img src={logoImage} alt="logo"/>
                </Link>

                {/* <Authorization /> */}
                <Registration />
            </div>
        </section>
    );
}