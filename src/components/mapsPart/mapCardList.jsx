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
        allFavouriteMaps
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

            setCards(response.map(thisMap => (
                <PublicMapCard
                    key={thisMap.id}
                    id={thisMap.id}
                    name={thisMap.name}
                    id_creator={thisMap.id_creator}
                    creator_name={thisMap.creator_name}
                    number_in_favourites={thisMap.number_in_favourites}
                    wasFavourite={thisMap.wasFavourite}
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
                    wasFavourite={map.wasFavourite}
                />
            )))
        } catch (e) {
            console.log(e);
        }
    }

    const fetchFavouriteMaps = async () => {
        try {
            const response = await allFavouriteMaps(textToFind, sortByField);

            setCards(response.map(thisMap => (
                <PublicMapCard
                    key={thisMap.id}
                    id={thisMap.id}
                    name={thisMap.name}
                    id_creator={thisMap.id_creator}
                    creator_name={thisMap.creator_name}
                    number_in_favourites={thisMap.number_in_favourites}
                    wasFavourite={thisMap.wasFavourite}
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
            fetchFavouriteMaps();
        } else if (reqCards === 'user') {
            fetchUserMaps();
        } else {
            setCards(null);
        }
    }, [reqCards, textToFind, sortByField]);

    return (
        <div className="flex-row-sb-c flex-wrap flex-gap-20">
            {cards}
        </div>
    );
}