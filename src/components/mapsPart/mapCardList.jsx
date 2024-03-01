import React from 'react';

import PersonalMapCard from "./personalMapCard";
import UserMapCard from './userMapCard';
import PublicMapCard from './publicMapCard';

export default function MapCardList() {
    return (
        <div className="flex-row-sb-c flex-wrap flex-gap-20">
            <UserMapCard />
            <UserMapCard />
            <UserMapCard />
            <UserMapCard />
            <UserMapCard />
            <UserMapCard />
            <UserMapCard />
            <UserMapCard />
            <UserMapCard />
            <UserMapCard />
            <UserMapCard />
        </div>
    );
}