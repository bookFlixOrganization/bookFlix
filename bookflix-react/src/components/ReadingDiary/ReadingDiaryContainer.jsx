import React from 'react';
import ReadingDiary from './ReadingDiary.jsx';
import PreferencesCheck from '../PreferencesCheck.jsx';

const ReadingDiaryContainer = () => {
    return (
        <>
            <PreferencesCheck />
            <ReadingDiary />;
        </>
    );
};

export default ReadingDiaryContainer;
