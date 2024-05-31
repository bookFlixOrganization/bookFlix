from tests.conftest import client


def test_search_book():
    response = client.get("/search/book", params="query=algorithms")
    assert response.status_code == 200
    assert len(response.json()["items"]) != 0


def test_get_book():
    response = client.get("/book/XrHsDwAAQBAJ", params="book_id=XrHsDwAAQBAJ")
    assert response.status_code == 200
    assert len(response.json()) != 0


def test_most_popular_books():
    response = client.get("/list/most_popular_books")
    assert response.status_code == 200
