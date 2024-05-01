import React, { useState } from 'react';
import Header from './Header.jsx';

const HeaderContainer = () => {
    const [isActive, setActive] = useState(false);
    const handleButtonClick = () => {
        setActive(!isActive);
    };

    return <Header isActive={isActive} handleButtonClick={handleButtonClick} />;
};

export default HeaderContainer;
