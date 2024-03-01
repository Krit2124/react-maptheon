import React from 'react';

import SearchField from 'components/sharedElements/searchField';
import ObjectsSet from './objectsSet';

export default function objectsLibraryPage() {
    return (
        <section className="background-gray-default">
            <div className="container">
                <div className="flex-row-sb-c flex-gap-20">
                    <div className="flex-row-sb-c flex-gap-10">
                        <button className="button-text-usual active">Боевые</button>
                        <button className="button-text-usual">Региональные</button>
                        <button className="button-text-usual">Мировые</button>
                    </div>
                    <SearchField />
                    <div className="flex-row-sb-c flex-gap-10">
                        <button className="button-text-usual">Подборки</button>
                        <button className="button-text-usual">Тэги</button>
                    </div>
                    
                </div>
            </div>

            <div className="container">
                <ObjectsSet />
            </div>
        </section>
    );
}