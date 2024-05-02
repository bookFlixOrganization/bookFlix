from conftest import client


def test_gigachat():
    response = client.get("/recommendation", params="query=metro 2033")
    assert response.status_code == 200
    assert len(response.json()["content"]) != 0
