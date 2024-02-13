import "./header.css"
import logo from "../../assets/Logo.png"


function Header() {
    return (
        <header className="border-black-bottom">
            <div className="container">
                <img src={logo} alt="logo"/>
                <h1>Текст</h1>
            </div>
        </header>
    );
}

export default Header;