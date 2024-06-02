# BookFlix <img src="https://s12.gifyu.com/images/SYLkh.png" alt="drawing" height="25" width="25"/>

Группа: М8О-101Б-23  
В команде:

+ Погожев Максим - __teamleader__, __backend__
+ Земсков Павел - __backend__
+ Хныченко Артем - __backend__
+ Терентьев Михаил - __frontend__
+ Зарецкая Анастасия - __frontend__


## Использованные технологии
**backend**

<img src="https://icon-icons.com/icons2/2107/PNG/96/file_type_python_icon_130221.png" alt="drawing" height="100" width="100"/> <img src="https://icon-icons.com/icons2/2415/PNG/96/postgresql_plain_logo_icon_146389.png" alt="drawing" height="100" width="100"/> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/SQLAlchemy.svg/1200px-SQLAlchemy.svg.png" alt="drawing" height="100" width="100"/> <img src="https://icon-icons.com/icons2/3913/PNG/512/fastapi_logo_icon_248575.png" alt="drawing" height="100" width="100"/>


**frontend**

<img src="https://icon-icons.com/icons2/2107/PNG/512/file_type_html_icon_130541.png" alt="drawing" height="100" width="100"/> <img src="https://icon-icons.com/icons2/2107/PNG/96/file_type_css_icon_130661.png" alt="drawing" height="100" width="100"/> <img src="https://icon-icons.com/icons2/2108/PNG/96/javascript_icon_130900.png" alt="drawing" height="100" width="100"/> <img src="https://icon-icons.com/icons2/2415/PNG/96/react_original_logo_icon_146374.png" alt="drawing" height="100" width="100"/>



## Цель
Реализовать Веб-сервис для рекомендаций фильмов и книг на основе предпочтений пользователя

## Задачи
+ Продумать базу данных для проекта и реализовать ее, а также позаботиться о персональных данных пользователя.
+ Разработать функционал регистрации и аутентификации пользователей с возможностью изменения персональных данных.
+ Внедрить возможность получения информации о фильмах и книгах через сторонние API.
+ Внедрить систему оценок книг на сайте, включая сбор истории оценок и предпочтений пользователей.
+ Интегрировать GigaChat для автоматической генерации краткого содержания книг и рекомендаций, учитывая предпочтения пользователя.
+ Разработать функционал дневника чтения для пользователей.

## Актуальность
+ С развитием интернета люди сталкиваются с большим объемом контента. В таких условиях имеется потребность в системе, которая помогает пользователям сориентироваться и выбрать наиболее подходящие для них фильмы и книги.
+ Персонализированные рекомендации становятся все более востребованными среди пользователей. Они предпочитают фильмы и книги, которые соответствуют их предпочтениям и интересам, что повышает удовлетворенность и уровень использования платформы.
+ Постоянный рост числа пользователей интернета создает большой спрос на инструменты, которые помогут определиться с выбором среди разнообразия предложений фильмов и книг.


## Описание проекта
>~~_Даже Netflix позавидует_~~

BookFlix это веб-сервис для рекомендаций фильмов и книг, призванный помочь пользователям в выборе фильмов, сериалов для просмотра и книг для прочтения. На нашем сайте вы найдете самые актуальные произведения и сможете легко добавлять их в список избранных или отмечать как неинтересные.

Особенность BookFlix заключается в том, что мы используем данные об оценках и предпочтениях, которые вы указываете при регистрации, чтобы персонализировать рекомендации. Таким образом, мы предлагаем вам именно те книги и фильмы, которые соответствуют вашим интересам.

Кроме того, наш сайт предоставляет возможность вести личный дневник читателя. Здесь вы можете делиться своими впечатлениями, оставлять отзывы о книгах и читать статьи других пользователей. Вы также можете выразить свою поддержку, оценивая статьи и подписываясь на авторов, которые вас заинтересовали.

Присоединяйтесь к BookFlix и откройте для себя мир увлекательных произведений, подобранных специально для вас!

## Результат
<img src="https://s10.gifyu.com/images/SYp1B.gif" alt="drawing" height="459px" width="771px"/>

## Перспективы проекта
Проект может быть улучшен путем добавления различного функционала:
+ добавление друзей пользователя
+ авторизация через VK
+ добавление мессенджера
+ добавление админ панели
+ добавление достижений (посмотреть 5 фильмов, оценить 5 книг)
и т.д

## Инструкция по запуску

#### Для запуска FastApi приложения вам понадобится:
1. **Установка Poetry:**
    ```shell
    pip install poetry
    ```
2. **Установка зависимостей и создание окружения:**

	Перейдите в директорию server и установите зависимости.
  	```shell
	cd server
	poetry shell
    poetry install
    ```
3. **Установка библиотеки для работы с базой данных:**
	```shell
	python db_extensions.py
    ```
4. **Применение миграций:**
	```shell
	alembic upgrade head
    ```
5. **Установка make:**

	**Make** - это инструмент, используемый для управления и автоматизации выполнения задач. 
    Вот как можно установить **Make**  для [Windows](https://stackoverflow.com/questions/32127524/how-to-install-and-use-make-in-windows), для [MacOS](https://formulae.brew.sh/formula/make).
    
6. **Запуск приложения:**

 	Для запуска FastAPI приложения используйте команду:
   ```sh
   make app
   ```

#### Для запуска React приложения вам понадобится:
1. **Node.js и npm:**

   Убедитесь, что у вас установлены Node.js и npm. Если это не так, скачайте и установите Node.js с [официального сайта](https://nodejs.org/). npm будет установлен вместе с Node.js.


2. **Установка зависимостей:** 

	Перейдите в директорию проекта и выполните команду `npm install` для установки всех необходимых зависимостей, указанных в файле `package.json`.


3. **Запуск приложения:** 

	После установки зависимостей, вы можете запустить приложение с помощью команды `npm start`. Эта команда запускает скрипт `start`, указанный в файле `package.json`.

4. **Открытие приложения:**
 
	После запуска приложения, оно обычно открывается в браузере по адресу `http://localhost:3000`. Если это не произошло автоматически, откройте браузер и введите этот URL в адресную строку.

#### Использование Makefile

- **Запуск линтеров**:
  ```sh
  make all-linters
  ```

- **Автоматическое исправление кода с помощью autoflake**:
  ```sh
  make autoflake
  ```

- **Проверка типов с mypy**:
  ```sh
  make mypy
  ```

- **Запуск flake8 для статического анализа кода**:
  ```sh
  make flake8
  ```

- **Запуск pylint для анализа кода**:
  ```sh
  make pylint
  ```

- **Сортировка TOML файлов**:
  ```sh
  make toml-sort
  ```

- **Запуск приложения**:
  ```sh
  make app
  ```

- **Запуск тестов**:
  ```sh
  make pytest
  ```

- **Запуск тестов с покрытием кода**:
  ```sh
  make pytest-cov
  ```



## Список источников

| Backend                                                                                                   | Frontend                                                                                              |
|-----------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| <img src="https://icon-icons.com/icons2/3913/PNG/512/fastapi_logo_icon_248575.png" alt="FastApi" width="60" height="60"> [FastApi](https://fastapi.tiangolo.com/)                                                     | <img src="https://icon-icons.com/icons2/2107/PNG/512/file_type_html_icon_130541.png" alt="HTML" width="60" height="60"> [HTML учебник](https://html5css.ru/html/default.php)                                                  |
| <img src="https://avatars.githubusercontent.com/u/6043126?v=4" alt="SQL Alchemy" width="60" height="60"> [SQL Alchemy](https://www.sqlalchemy.org/)                                                   | <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/CSS3_logo.svg/160px-CSS3_logo.svg.png" alt="CSS3" width="60" height="60"> [Самоучитель CSS](https://htmlbook.ru/samcss)                                                         |
| <img src="https://tmdb-rethunk.vercel.app/tmdb.png" alt="TMDB" width="60" height="60"> [TMDB Api](https://developer.themoviedb.org/reference/intro/getting-started)                              | <img src="https://sun6-23.userapi.com/s/v1/ig2/dUd6JuN-6tQlUCvidD46QGFSE0YAMo05D-L-KKReqr7goKAXWhNg2vuxi4gRSJpnaujUBOi-ihpvMfVR4Om1q4Df.jpg?size=1020x1020&quality=95&crop=0,0,1020,1020&ava=1" alt="JavaScript" width="60" height="60"> [JS](https://developer.mozilla.org/ru/docs/Web/JavaScript)                               |
| <img src="https://banner2.cleanpng.com/20180706/czk/kisspng-imdb-television-film-actor-imdb-5b3f4532486af5.0331136915308731382966.jpg" alt="IMDB" width="60" height="60"> [IMDB Api](https://developer.imdb.com/documentation/?ref_=side_nav)                                       | <img src="https://i2.wp.com/miro.medium.com/1*K0a7xINk0RM5gfXGSN68cw.png" alt="React" width="60" height="60"> [React](https://ru.react.js.org/docs/getting-started.html)                               |
| <img src="https://4pda.to/s/as6yvZSnRmYwyIONMCdcSXKEJqoiN6Iz1rLDnJqoywTY7.jpg?v=1695297369" alt="GigaChat" width="60" height="60"> [GigaChat Api](https://developers.sber.ru/docs/ru/gigachat/api/overview)                                  | <img src="https://swiperjs.com/images/swiper-logo.svg" alt="Swiper" width="60" height="60"> [Swiper](https://swiperjs.com/react)                                                                  |
| <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Google_Books_logo_2015.svg/2560px-Google_Books_logo_2015.svg.png" alt="Google Books" width="60" height="60"> [Google Books Api](https://developers.google.com/books/docs/v1/using?hl=ru)                               | <img src="https://i.ytimg.com/vi/Pi30WHXsj6Y/maxresdefault.jpg" alt="React Hooks" width="60" height="60"> [React Hooks шпаргалка](https://my-js.org/docs/cheatsheet/react-hooks/)                               |
| <img src="https://www.storybench.org/wp-content/uploads/2018/01/nytdev.jpg" alt="New York Times" width="60" height="60"> [New York Times Api](https://developer.nytimes.com/apis)                                                  | <img src="https://www.duthanhduoc.com/images/tai-sao-chung-ta-nen-dung-mot-middleware-nhu-redux-thunk/feature.jpg" alt="Redux" width="60" height="60"> [Redux](https://redux.js.org/)                                                           |



## Ссылки
- [<span style="font-size: 25px;">Miro</span>](https://miro.com/app/board/uXjVKa_7LCk=/)

    <img src="https://s10.gifyu.com/images/SYLkW.png" alt="drawing" height="150" width="150"/>

- [<span style="font-size: 25px;">Notion</span>](https://www.notion.so/a8652977f6ff4a67b2690ac26c07233f?v=a2426f9d322e4f5dbc60f4a567b308e2)

    <img src="https://s12.gifyu.com/images/SYLkc.png" alt="drawing" height="150" width="150"/>

