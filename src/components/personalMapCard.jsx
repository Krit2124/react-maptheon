import React from 'react';

function PersonalMapCard() {
    return (
        <div className="flex-col-sb-c background-gray-search flex-gap-15 personalMapCard">
            <div className="mapCardPlaceholder"></div>
            <div className="flex-row-sb-c mapCardContent">
                <h2>Название карты</h2>
                
                <p>22.02.2024</p>
            </div>
        </div>
    );
}

export default PersonalMapCard;