# Deployment

Auf dem Homeserver:

```bash
git pull
docker compose up -d --build
docker compose ps
```

Prüfen:

```bash
curl http://localhost:8080/healthz
docker compose logs --tail 50
```
