from httpx import AsyncClient


async def test_user_info(ac: AsyncClient):
    res = await ac.get("/users/me")
    assert res.status_code == 200


async def test_preferences_after_register(ac: AsyncClient):
    form_data = {
        "film_genre": [
            "action"
        ],
        "book_genre": [
            "roman"
        ]
    }
    res = await ac.post("/preferences_after_register", json=form_data)
    assert res.status_code == 200


async def test_preferences_edit(ac: AsyncClient):
    form_data = {
        "film_genre": [
            "roman"
        ],
        "book_genre": [
            "science"
        ]
    }
    response = await ac.post("/preferences_edit", json=form_data)
    assert response.status_code == 200
    res = await ac.get("/favourite")
    content = res.json()
    print(content)
    assert content["favorite_genre_books"] == form_data["book_genre"] and content["favorite_genre_films"] == \
           form_data["film_genre"]


async def test_favourite(ac: AsyncClient):
    response = await ac.get("/favourite")
    assert response.status_code == 200


async def test_add_liked_film(ac: AsyncClient):
    response = await ac.post("/film/{movie_id}/add_liked_films",
                             params="liked_movie_title=Forrest Gump&liked_movie_id=0109830")
    assert response.status_code == 200
    res = await ac.get("/favourite")
    assert res.status_code == 200
    content = res.json()
    assert content["liked_films"][0][0] == "Forrest Gump" and content["liked_films"][0][1] == "0109830"


async def test_add_disliked_film(ac: AsyncClient):
    response = await ac.post("/film/{movie_id}/add_disliked_films",
                             params="disliked_movie_title=8 Mile&disliked_movie_id=0298203")
    assert response.status_code == 200
    res = await ac.get("/favourite")
    assert res.status_code == 200
    content = res.json()
    assert content["disliked_films"][0][0] == "8 Mile" and content["disliked_films"][0][1] == "0298203"


async def test_added_movie(ac: AsyncClient):
    response = await ac.get("/favourite/added_movie")
    assert response.status_code == 200
    data = response.json()
    assert "0109830" in data.keys()


async def test_history_movie(ac: AsyncClient):
    response = await ac.get("/favourite/history_movies")
    assert response.status_code == 200
    data = response.json()
    assert "0109830" in data.keys() and "0298203" in data.keys()


async def test_recommendation_movie(ac: AsyncClient):
    response = await ac.get("/recommendation_movie")
    assert response.status_code == 200
    data = response.json()
    assert len(data.keys()) != 0


async def test_delete_liked_film(ac: AsyncClient):
    response = await ac.post("/film/{movie_id}/delete_liked_films",
                             params="liked_movie_title=Forrest Gump&liked_movie_id=0109830")
    assert response.status_code == 200
    res = await ac.get("/favourite")
    assert res.status_code == 200
    content = res.json()
    flag = True
    for movie in content["liked_films"]:
        if movie[0] == "Forrest Gump":
            flag = False
    assert flag


async def test_delete_disliked_film(ac: AsyncClient):
    response = await ac.post("/film/{movie_id}/delete_disliked_films",
                             params="disliked_movie_title=8 Mile&disliked_movie_id=0298203")
    assert response.status_code == 200
    res = await ac.get("/favourite")
    assert res.status_code == 200
    content = res.json()
    flag = True
    for movie in content["disliked_films"]:
        if movie[0] == "Forrest Gump":
            flag = False
    assert flag


async def test_add_liked_book(ac: AsyncClient):
    response = await ac.post("/book/{book_id}/add_liked_books",
                             params="liked_book_title=Оно&liked_book_id=je-mAAAAQBAJ")
    assert response.status_code == 200
    res = await ac.get("/favourite")
    assert res.status_code == 200
    content = res.json()
    assert content["liked_books"][0][0] == "Оно" and content["liked_books"][0][1] == "je-mAAAAQBAJ"


async def test_add_disliked_book(ac: AsyncClient):
    response = await ac.post("/book/{book_id}/add_disliked_books",
                             params="disliked_book_title=Идиот&disliked_book_id=bGIaegQc_ocC")
    assert response.status_code == 200
    res = await ac.get("/favourite")
    assert res.status_code == 200
    content = res.json()
    assert content["disliked_books"][0][0] == "Идиот" and content["disliked_books"][0][1] == "bGIaegQc_ocC"


async def test_added_book(ac: AsyncClient):
    response = await ac.get("/favourite/added_book")
    assert response.status_code == 200
    data = response.json()
    assert "je-mAAAAQBAJ" in data.keys()


async def test_history_book(ac: AsyncClient):
    response = await ac.get("/favourite/history_book")
    assert response.status_code == 200
    data = response.json()
    assert "je-mAAAAQBAJ" in data.keys() and "bGIaegQc_ocC" in data.keys()


async def test_recommendation_book(ac: AsyncClient):
    response = await ac.get("/recommendation_book")
    assert response.status_code == 200
    data = response.json()
    assert len(data.keys()) != 0


async def test_delete_liked_book(ac: AsyncClient):
    response = await ac.post("/book/{book_id}/delete_liked_books",
                             params="liked_book_title=Оно&liked_book_id=je-mAAAAQBAJ")
    assert response.status_code == 200
    res = await ac.get("/favourite")
    assert res.status_code == 200
    content = res.json()
    flag = True
    for movie in content["liked_books"]:
        if movie[0] == "Оно":
            flag = False
    assert flag


async def test_delete_disliked_book(ac: AsyncClient):
    response = await ac.post("/book/{book_id}/delete_disliked_books",
                             params="disliked_book_title=Идиот&disliked_book_id=bGIaegQc_ocC")
    assert response.status_code == 200
    res = await ac.get("/favourite")
    assert res.status_code == 200
    content = res.json()
    flag = True
    for movie in content["disliked_books"]:
        if movie[0] == "Идиот":
            flag = False
    assert flag
