import React from 'react';

const YourFilms = () => {
    return (
        <section className="now_watching_text">
            <div className="container">
                <div className="section_header">
                    <p className="section_title_1">Главная</p>
                    <div className="section_header_1">
                        <p className="section_title">Фильмы и сериалы персонально для вас</p>
                        <a href="/" className="button_all">
                            Всё
                        </a>
                    </div>
                    <p className="section_subtitle">
                        Индивидуальные рекомендации на основе ваших просмотров и оценок
                    </p>
                </div>
            </div>
        </section>
    );
};

export default YourFilms;
