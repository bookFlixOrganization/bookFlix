import React from 'react';

const PopularBooks = () => {
    return (
        <section className="now_reading_text">
            <div className="container">
                <div className="section_header">
                    <div className="section_header_1">
                        <p className="section_title">Сейчас читают</p>
                        <a href="/" className="button_all">
                            Всё
                        </a>
                    </div>
                    <p className="section_subtitle">Самые популярные книги за последний час</p>
                </div>
            </div>
        </section>
    );
};

export default PopularBooks;
