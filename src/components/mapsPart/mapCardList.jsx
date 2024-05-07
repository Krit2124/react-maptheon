import React, { useEffect, useState } from 'react';

import { useServerMapOperationsStore, useUserStore } from 'store/store';

import PersonalMapCard from "./personalMapCard";
import UserMapCard from './userMapCard';
import PublicMapCard from './publicMapCard';

export default function MapCardList({reqCards}) {
    const {
        user,
        checkAuth,
    } = useUserStore();

    const { myMaps } = useServerMapOperationsStore();
    const [cards, setCards] = useState();

    useEffect(() => {
        const fetchData = async () => {
            await checkAuth();
            const response = await myMaps(user.id);
            console.log(response);

            setCards(response.data.map(map => (
                <PersonalMapCard
                    id={map.id}
                    name={map.name}
                    isPublic={map.is_public}
                    updatedAt={map.updatedAt}
                    imagePath={map.imagePath}
                />
            )))
        };

        if (reqCards === 'personal') {
            fetchData();
        }
    }, []);

    // if (reqCards === 'public') {
    //     cards = Array(10).fill(<PublicMapCard />);
    // } else if (reqCards === 'personal') {
    //     console.log(maps);
        
    //     cards = maps[0].map(map => (
    //         <PersonalMapCard
    //             id={map.id}
    //             name={map.name}
    //             isPublic={map.is_public}
    //             updatedAt={map.updatedAt}
    //             imagePath={map.imagePath}
    //         />
    //     ));
    // } else if (reqCards === 'favourite') {
    //     cards = Array(10).fill(<PublicMapCard />);
    // } else if (reqCards === 'user') {
    //     cards = Array(10).fill(<UserMapCard />);
    // } else {
    //     cards = null;
    // }

    return (
        <div className="flex-row-sb-c flex-wrap flex-gap-20">
            {cards}
        </div>
    );
}