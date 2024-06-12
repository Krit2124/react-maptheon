import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useSearchFieldStore, useServerMapOperationsStore } from 'store/store';

import PersonalMapCard from "./personalMapCard";
import UserMapCard from './userMapCard';
import PublicMapCard from './publicMapCard';


export default function MapCardList({reqCards}) {
    const { id_user } = useParams();

    const {
        textToFind,
        sortByField,
    } = useSearchFieldStore();

    const {
        allMaps,
        myMaps,
        userMaps,
    } = useServerMapOperationsStore();
    
    const [cards, setCards] = useState();

    const fetchPersonalMaps = async () => {
        try {
            const response = await myMaps(textToFind, sortByField);

            setCards(response.map(map => (
                <PersonalMapCard
                    key={map.id}
                    id={map.id}
                    name={map.name}
                    updatedAt={map.updatedAt}
                />
            )))
        } catch (e) {
            console.log(e);
        }
    };

    const fetchPublicMaps = async () => {
        try {
            const response = await allMaps(textToFind, sortByField);

            setCards(response.map(map => (
                <PublicMapCard
                    key={map.id}
                    id={map.id}
                    name={map.name}
                    id_creator={map.id_creator}
                    creator_name={map.creator_name}
                    number_in_favourites={map.number_in_favourites}
                />
            )))
        } catch (e) {
            console.log(e);
        }
    }

    const fetchUserMaps = async () => {
        try {
            const response = await userMaps(id_user, textToFind, sortByField);

            setCards(response.map(map => (
                <UserMapCard
                    key={map.id}
                    id={map.id}
                    name={map.name}
                    number_in_favourites={map.number_in_favourites}
                />
            )))
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (reqCards === 'personal') {
            fetchPersonalMaps();
        } else if (reqCards === 'public') {
            fetchPublicMaps()
        } else if (reqCards === 'favourite') {
            setCards(null);
        } else if (reqCards === 'user') {
            fetchUserMaps();
        } else {
            setCards(null);
        }
    }, [reqCards, textToFind, sortByField]);

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