import React from 'react';

import SearchField from "./searchField";
import MapCardList from './mapCardList';

function PublicMapsPage() {
    return (
        <section className="background-gray-default">
            <div className="container">
                <SearchField />
            </div>

            <div className="container">
                <MapCardList />
            </div>
        </section>
    );
}

export default PublicMapsPage;