from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_check():
    """Test that health check endpoint returns 200 OK"""
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"
    assert data["version"] == "1.0.0"
