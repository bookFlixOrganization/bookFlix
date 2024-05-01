import React, { useState } from 'react';
import AuthPage from './AuthPage.jsx';

const AuthPageContainer = () => {
    const [isActive, setActive] = useState(false);

    const handleRegistrationClick = () => {
        setActive(!isActive);
    };

    return <AuthPage isActive={isActive} handleRegistrationClick={handleRegistrationClick} />;
};

export default AuthPageContainer;
