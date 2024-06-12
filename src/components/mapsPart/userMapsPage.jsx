import React, { useEffect, useState } from 'react';

import { useUserStore } from 'store/store';
import SearchField from "../sharedElements/searchField";
import MapCardList from './mapCardList';

import userWithoutAvatarImage from "../../assets/UserWithoutAvatar.png"
import { useParams } from 'react-router-dom';

function UserMapsPage() {
    const { id_user } = useParams();

    const {
        getProfileInfo,
    } = useUserStore();

    const [userName, setUserName] = useState();
    const [userDescription, setUserDescription] = useState();

    const fetchUserProfileInfo = async () => {
        try {
            const userInfo = await getProfileInfo(id_user);
            setUserName(userInfo.username);
            setUserDescription(userInfo.description);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        try {
            fetchUserProfileInfo();
        } catch (e) {
            console.log(e);
        }
    }, [])

    return (
        <section className="background-gray-default">
            <div className="container">
                <div className='flex-row-c-c flex-gap-40'>
                    <img src={userWithoutAvatarImage} alt="Аватар" />
                    
                    <div className='flex-col-sb-left flex-gap-10'>
                        <h1>{userName}</h1>
                        <p>{userDescription}</p>
                    </div>
                </div>
            </div>

            <div className="container">
                <SearchField />
            </div>

            <div className="container">
                <MapCardList reqCards="user"/>
            </div>
        </section>
    );
}

export default UserMapsPage;