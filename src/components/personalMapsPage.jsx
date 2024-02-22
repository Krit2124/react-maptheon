import PersonalMapCardList from "./personalMapCardList";
import SearchField from "./searchField";

function PersonalMapsPage() {
    return (
        <section className="background-gray-default">
            <div className="container">
                <div className="flex-row-sb-c flex-gap-20">
                    <div className="flex-row-sb-c flex-gap-10">
                        <button className="button-text-usual active">Ваши карты</button>
                        <button className="button-text-usual">Избранное</button>
                    </div>
                    <SearchField />
                    <button className="button-text-usual">Создать карту</button>
                </div>
            </div>

            <div className="container">
                <PersonalMapCardList />
            </div>
        </section>
    );
}

export default PersonalMapsPage;