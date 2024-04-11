from tests.conftest import client


# def test_get_top_rated():
#     response = client.get("/tmdb/top_rated")
#     assert response.status_code == 200

def test_search_movie():
    response = client.get("/search/movie", params="query=Forrest Gump")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    assert len(response.json()["result"]) != 0


def test_search_person():
    response = client.get("/search/person", params="query=Cillian Murphy")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    assert len(response.json()["result"]) != 0


def test_get_movie_by_id():
    response = client.get("/get/movie", params="movie_id=0109830")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    assert len(response.json()["result"]) != 0


def test_get_person():
    response = client.get("/get/person", params="person_id=0614165")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    assert len(response.json()["result"]) != 0


def test_search_keyword():
    response = client.get("/search/keyword", params="query=drive")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    assert len(response.json()["result"]) != 0


def test_get_keyword():
    response = client.get("/search/keyword", params="query=grinch")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"
    assert len(response.json()["result"]) != 0