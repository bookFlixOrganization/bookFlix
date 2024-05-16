import React from 'react';
import ReadingDiary from './ReadingDiary.jsx';
import SessionChecker from '../SessionChecker.jsx';

const ReadingDiaryContainer = () => {
    return (
        <>
            <SessionChecker />
            <ReadingDiary />;
        </>
    );
};

export default ReadingDiaryContainer;
