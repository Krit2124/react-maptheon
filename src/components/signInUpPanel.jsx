import Link from "react-router-dom"
import Authorization from "./authorization"
import logoImage from "../assets/Logo.png"
import Registration from "./registration";

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