function Registration() {
    return (
        <div className="flex-col-sb-left flex-gap-30">
            <h1>Регистрация</h1>

            <form className="flex-col-sb-left flex-gap-30">
                <div className="flex-col-sb-left flex-gap-15">
                    <input className="textInput-usual" type="text" placeholder="Email"/>
                    <input className="textInput-usual" type="password" placeholder="Пароль"/>
                    <input className="textInput-usual" type="password" placeholder="Повторите пароль"/>
                </div>
                
                <div className="flex-row-sb-c flex-gap-10">
                    <button type="submit" className="button-text-usual active">Зарегистрироваться</button>
                    <button className="button-text-usual">Вход</button>
                </div>
            </form>
        </div>
    );
}

export default Registration;