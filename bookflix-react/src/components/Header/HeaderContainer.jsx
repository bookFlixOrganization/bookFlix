import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRequest } from '../../redux/headerReducer.js';
import Header from './Header.jsx';

const HeaderContainer = () => {
    const dispatch = useDispatch();
    const [isActive, setActive] = useState(false);
    const handleSearchClick = () => {
        setActive(!isActive);
    };

    const requestText = useSelector((state) => state.headerReducer.request);
    const handleTextChange = (event) => {
        dispatch(setRequest(event.target.value));
    };

    const handleClearClick = () => {
        dispatch(setRequest(''));
    };

    return (
        <Header
            isActive={isActive}
            handleSearchClick={handleSearchClick}
            requestText={requestText}
            handleTextChange={handleTextChange}
            handleClearClick={handleClearClick}
        />
    );
};

export default HeaderContainer;
