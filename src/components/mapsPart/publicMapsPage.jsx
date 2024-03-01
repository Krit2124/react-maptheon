import React from 'react';

import SearchField from "../sharedElements/searchField";
import MapCardList from './mapCardList';

export default function PublicMapsPage() {
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