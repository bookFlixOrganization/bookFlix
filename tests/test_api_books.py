from conftest import client


def test_search_book():
    response = client.get("/search/book", params="query=algorithms")
    assert response.status_code == 200
    assert len(response.json()["items"]) != 0


def test_get_book():
    response = client.get("/search/book", params="query=XrHsDwAAQBAJ")
    assert response.status_code == 200
    assert len(response.json()["items"]) != 0
