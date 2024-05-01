import React from 'react';

const YourBooks = () => {
    return (
        <section className="now_reading_text">
            <div className="container">
                <div className="section_header">
                    <div className="section_header_1">
                        <p className="section_title">Книги персонально для вас</p>
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

export default YourBooks;
