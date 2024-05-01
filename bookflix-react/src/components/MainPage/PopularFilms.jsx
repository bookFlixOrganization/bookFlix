import React from 'react';

const PopularFilms = () => {
    return (
        <section className="now_watching_text_1">
            <div className="container">
                <div className="section_header">
                    <div className="section_header_1">
                        <p className="section_title">Сейчас смотрят</p>
                        <a href="/" className="button_all">
                            Всё
                        </a>
                    </div>
                    <p className="section_subtitle">
                        Самые популярные фильмы и сериалы за последний час
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PopularFilms;
