import PublicMapCardList from "../publicMapCardList/publicMapCardList";
import SearchField from "../searchField/searchField";

function PublicMapsPage() {
    return (
        <section className="background-gray-default">
            <div className="container">
                <SearchField />
            </div>

            <div className="container">
                <PublicMapCardList />
            </div>
        </section>
    );
}

export default PublicMapsPage;