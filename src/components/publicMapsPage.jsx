import PublicMapCardList from "./publicMapCardList";
import SearchField from "./searchField";

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