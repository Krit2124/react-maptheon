import React from 'react';
import api from "../../http/index";

export default function PersonalMapCard({id, name, isPublic, updatedAt, imagePath}) {
    return (
        <div className="flex-col-sb-c background-gray-search flex-gap-15 personalMapCard">
            <img src={"http://localhost:3051/" + imagePath} className="mapCardImg" alt={name}></img>
            <div className="flex-row-sb-c mapCardContent">
                <h3>{name}</h3>
                
                <p>{updatedAt}</p>
            </div>
        </div>
    );
}