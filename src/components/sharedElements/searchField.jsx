import React from 'react';

import Dropdown from 'react-bootstrap/Dropdown'
import FormControl from 'react-bootstrap/FormControl'
import InputGroup from 'react-bootstrap/InputGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { useState } from 'react'
import { useSearchFieldStore } from 'store/store';

import loupeImage from "../../assets/icons/Loupe.png"
import closeImage from "../../assets/icons/Close.png"
import showOrHideImage from "../../assets/icons/ShowOrHide.png"

function SearchField() {
    const {
        textToFind, setTextToFind,
        sortByField, setSortByField,
        sortCapture, setSortCapture,
    } = useSearchFieldStore();

    const [selectedSort, setSelectedSort] = useState('Недавние');
    const handleSortSelect = (sortOption) => {
        setSelectedSort(sortOption);
    };

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <InputGroup className="textInput-search flex-row-sb-c background-gray-search">
            {textToFind === "" ? (
                <img src={loupeImage} alt="Поиск"/>
            ) : (
                <img src={closeImage} className='size-image-tiny pointer' alt="Очистить" onClick={() => {setTextToFind('')}}/>
            )}
            

            <FormControl
                placeholder="Введите название или ключевые слова..."
                aria-label="Введите название или ключевые слова..."
                className='flex-row-left-c textInput-search-field'
                value={textToFind}
                onChange={(e) => setTextToFind(e.target.value)}
            />

            <DropdownButton className='flex-col-sb-right' id="input-dropdown" onToggle={handleDropdownToggle} align="end" title={
                <span>
                    {sortCapture}
                    <img
                        src={showOrHideImage}
                        alt="Показать или скрыть"
                        style={{
                        marginLeft: '10px',
                        width: '12px',
                        transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.3s ease-in-out',
                        }}
                    />
                </span>
            }>
                <div className='flex-col-sb-right'>
                    <Dropdown.Item onClick={() => {setSortByField('updatedAt'); setSortCapture('Недавние')}}>Недавние</Dropdown.Item>
                    <Dropdown.Item onClick={() => {setSortByField('number_in_favourites'); setSortCapture('Наиболее популярные')}}>Наиболее популярные</Dropdown.Item>
                    <Dropdown.Item onClick={() => {setSortByField('name'); setSortCapture('А-Я')}}>А-Я</Dropdown.Item>
                </div>
            </DropdownButton>
        </InputGroup>
    );
}

export default SearchField;