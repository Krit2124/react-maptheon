import React from 'react';

import PersonalMapCard from "./personalMapCard";
import UserMapCard from './userMapCard';
import PublicMapCard from './publicMapCard';

export default function MapCardList({reqCards}) {
    let cards;

    if (reqCards === 'public') {
        cards = Array(10).fill(<PublicMapCard />);
    } else if (reqCards === 'personal') {
        cards = Array(10).fill(<UserMapCard />);
    } else if (reqCards === 'favourite') {
        cards = Array(10).fill(<PublicMapCard />);
    } else if (reqCards === 'user') {
        cards = Array(10).fill(<UserMapCard />);
    } else {
        cards = null;
    }

    return (
        <div className="flex-row-sb-c flex-wrap flex-gap-20">
            {cards}
        </div>
    );
}