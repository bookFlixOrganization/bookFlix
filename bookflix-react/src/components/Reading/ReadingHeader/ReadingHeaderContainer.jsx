import React, { useState } from 'react';
import ReadingHeader from './ReadingHeader.jsx';

const ReadingHeaderContainer = () => {
    const [activeLink, setActiveLink] = useState('reading-diary');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return <ReadingHeader activeLink={activeLink} handleLinkClick={handleLinkClick} />;
};

export default ReadingHeaderContainer;
