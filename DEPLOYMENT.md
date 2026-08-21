# Deployment auf dem Homeserver

Schritt-für-Schritt-Anleitung, um `julian.stengele-home.de` online zu bringen.
Geschrieben zum Abarbeiten von oben nach unten — jeder Schritt endet mit einer
Prüfung, bevor der nächste beginnt.

**Zielumgebung**

| | |
| --- | --- |
| Server | `julian@192.168.178.70` (HP ProDesk 400 G2 Mini, Ubuntu 24.04) |
| Bereits vorhanden | Docker + Compose, Nginx Proxy Manager, cloudflared |
| Domain | `julian.stengele-home.de` (Zone `stengele-home.de`) |
| Repository | `https://github.com/steju4/julian-portfolio` |
| Branch | `claude/julian-portfolio-site-s19dq5` |
| Besonderheit | DS-Lite-Anschluss, keine öffentliche IPv4 — Zugriff läuft ausschließlich über den Cloudflare Tunnel |

> **Was nur im Cloudflare-Dashboard geht:** Schritt 5. Alles andere läuft auf
> dem Server.

---

## Schritt 0 — Lage prüfen

Vor der ersten Änderung feststellen, was auf dem Server tatsächlich läuft.
Nichts davon verändert etwas.

```bash
ssh julian@192.168.178.70

# Was läuft gerade?
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Ports}}'

# Welche Netze gibt es?
docker network ls

# Ist Port 8080 noch frei?
ss -tlnp | grep -E ':8080\s' || echo "Port 8080 ist frei"
```

**Festhalten für später:**

1. Name des **NPM-Containers** (meist `nginx-proxy-manager` oder `npm-app-1`)
2. Name des **cloudflared-Containers** oder ob cloudflared als systemd-Dienst läuft:
   `systemctl status cloudflared`
3. Ob **Port 8080 belegt** ist

> **Ist 8080 belegt**, im weiteren Verlauf überall `8080` durch einen freien
> Port ersetzen, zum Beispiel `8090`. Der Port steht in der
> `docker-compose.yml` unter `ports`.

---

## Schritt 1 — Code auf den Server holen

Der fertige Stand liegt im Branch `claude/julian-portfolio-site-s19dq5`.

### Variante A — Branch vorher auf `main` zusammenführen (empfohlen)

Auf **irgendeinem** Rechner mit Repo-Zugriff:

```bash
git clone https://github.com/steju4/julian-portfolio.git
cd julian-portfolio
git checkout main
git merge origin/claude/julian-portfolio-site-s19dq5
git push origin main
```

Danach auf dem Server einfach `main` klonen.

### Variante B — direkt den Branch deployen

```bash
ssh julian@192.168.178.70

# Zielverzeichnis passend zu den übrigen Compose-Projekten wählen
mkdir -p ~/docker && cd ~/docker

git clone -b claude/julian-portfolio-site-s19dq5 \
  https://github.com/steju4/julian-portfolio.git

cd julian-portfolio
```

**Prüfen:**

```bash
ls -1
# erwartet: Dockerfile  docker-compose.yml  nginx.conf  security-headers.conf
#           package.json  src  public  README.md  DEPLOYMENT.md
```

---

## Schritt 2 — Container bauen und starten

```bash
cd ~/docker/julian-portfolio
docker compose up -d --build
```

Der Build dauert beim ersten Mal ein bis drei Minuten — Node lädt die
Abhängigkeiten und erzeugt den statischen Build. Das Ergebnis ist ein Image
von rund 95 MB, in dem weder Node noch `node_modules` stecken.

**Prüfen:**

```bash
docker compose ps
# STATUS muss "Up ... (healthy)" zeigen.
# Steht dort noch "health: starting", 30 Sekunden warten und erneut prüfen.
```

Bleibt es bei `unhealthy` oder `Exit`:

```bash
docker compose logs --tail 50
```

---

## Schritt 3 — Lokal auf dem Server prüfen

Bevor Proxy und Tunnel ins Spiel kommen, muss der Container für sich
funktionieren.

```bash
# Startseite
curl -I http://localhost:8080
# erwartet: HTTP/1.1 200 OK

# Health-Endpunkt
curl http://localhost:8080/healthz
# erwartet: ok

# Sicherheits-Header
curl -sI http://localhost:8080 | grep -i "content-security-policy"
# erwartet: eine Zeile mit "default-src 'self'"
```

Erst wenn alle drei stimmen, weitermachen.

---

## Schritt 4 — Nginx Proxy Manager einrichten

Im NPM-Webinterface: **Hosts → Proxy Hosts → Add Proxy Host**

### Reiter „Details"

| Feld | Wert |
| --- | --- |
| Domain Names | `julian.stengele-home.de` |
| Scheme | `http` |
| Forward Hostname / IP | `192.168.178.70` |
| Forward Port | `8080` |
| Cache Assets | **aus** — das Caching macht bereits nginx im Container |
| Block Common Exploits | an |
| Websockets Support | aus |

### Reiter „SSL"

| Feld | Wert |
| --- | --- |
| SSL Certificate | **None** |
| Force SSL | **aus** |

> **Warum ohne Zertifikat?** Der Cloudflare Tunnel ist bereits verschlüsselt,
> und nach außen terminiert Cloudflare das TLS. Ein Let's-Encrypt-Zertifikat
> im NPM bräuchte eine erreichbare Domain — die es bei DS-Lite ohne den Tunnel
> gar nicht gibt. „Force SSL" hier einzuschalten führt in dieser Konstellation
> zu einer Weiterleitungsschleife.

**Prüfen** (vom Server aus, Host-Header setzen, weil der NPM danach entscheidet):

```bash
curl -I -H "Host: julian.stengele-home.de" http://192.168.178.70:80
# erwartet: HTTP/1.1 200 OK
```

Kommt hier `404` oder `502`, stimmt der Proxy Host noch nicht — nicht
weitermachen, sondern Domain-Schreibweise und Forward-Port prüfen.

### Sauberere Alternative: gemeinsames Docker-Netz

Damit gar kein Port auf dem Host offenstehen muss:

```bash
# Netz des NPM ermitteln
docker inspect <npm-container-name> \
  -f '{{range $k, $v := .NetworkSettings.Networks}}{{$k}}{{end}}'
```

Dann in der `docker-compose.yml` den `ports`-Block entfernen, die beiden
`networks`-Blöcke einkommentieren und den ermittelten Netznamen eintragen.
Anschließend `docker compose up -d`. Im NPM ist das Ziel dann
`julian-portfolio` auf Port `80`.

---

## Schritt 5 — Cloudflare Tunnel (im Dashboard)

**Zero Trust → Networks → Tunnels → deinen Tunnel wählen → Public Hostnames
→ Add a public hostname**

| Feld | Wert |
| --- | --- |
| Subdomain | `julian` |
| Domain | `stengele-home.de` |
| Path | leer lassen |
| Type | `HTTP` |
| URL | `192.168.178.70:80` |

Wichtig: Das Ziel ist der **Nginx Proxy Manager**, nicht der
Portfolio-Container. Der NPM entscheidet anhand des Hostnamens, welchen
Dienst er ausliefert — genau wie bei den anderen Diensten.

Den DNS-Eintrag legt Cloudflare dabei selbst an (ein `CNAME` auf
`<tunnel-id>.cfargotunnel.com`, proxied). **Kein A-Record auf die Heim-IP** —
das wäre bei DS-Lite ohnehin sinnlos.

### Falls der Tunnel über `config.yml` verwaltet wird

```yaml
tunnel: <tunnel-id>
credentials-file: /etc/cloudflared/<tunnel-id>.json

ingress:
  - hostname: julian.stengele-home.de
    service: http://192.168.178.70:80
  # bestehende Dienste hier belassen
  - service: http_status:404
```

Der `http_status:404`-Eintrag muss immer der **letzte** bleiben.

```bash
cloudflared tunnel route dns <tunnel-name> julian.stengele-home.de
sudo systemctl restart cloudflared     # oder: docker restart cloudflared
```

### SSL-Modus prüfen

**SSL/TLS → Overview** muss auf **Full** stehen, nicht auf „Flexible".

---

## Schritt 6 — Ende-zu-Ende testen

```bash
curl -I https://julian.stengele-home.de
# erwartet: HTTP/2 200

curl https://julian.stengele-home.de/healthz
# erwartet: ok

curl -sI https://julian.stengele-home.de | grep -i strict-transport
# HSTS kommt von Cloudflare, nicht aus dem Container
```

Dann im Browser öffnen und prüfen:

- [ ] Die Seite lädt vollständig, Schriften sehen richtig aus
- [ ] Der Abschnitt **GitHub** zeigt echte Zahlen (nicht nur Striche)
- [ ] Der Hinweis oben zeigt „Zuletzt aktiv auf GitHub · vor …"
- [ ] Entwicklerkonsole (F12) zeigt **keine** CSP-Fehler
- [ ] Auf dem Handy: Menü öffnet und schließt

---

## Schritt 7 — Wenn etwas klemmt

| Symptom | Ursache | Lösung |
| --- | --- | --- |
| `502 Bad Gateway` | NPM erreicht den Container nicht | `docker compose ps` — läuft er? Forward-IP und Port im NPM prüfen |
| `404` von Cloudflare | Public Hostname fehlt oder zeigt ins Leere | Schritt 5 prüfen; bei `config.yml`: steht `http_status:404` wirklich zuletzt? |
| Endlose Weiterleitung | „Force SSL" im NPM aktiv **und** Cloudflare auf „Flexible" | Force SSL aus **oder** Cloudflare auf „Full" |
| Seite lädt, aber ohne Schriften | Assets werden nicht ausgeliefert | `docker compose logs`; im Browser Netzwerk-Tab auf 404 bei `/assets/…` prüfen |
| GitHub-Zahlen bleiben leer | Kontingent erschöpft (60 Abrufe/Stunde/IP) oder CSP | Die Seite zeigt dann selbst einen Hinweis. Konsole auf CSP-Fehler prüfen |
| `nginx: [emerg] socket() [::]:80 failed` | IPv6 im Container | Sollte nicht auftreten — die Konfiguration lauscht bewusst nur auf IPv4 |
| Port bereits belegt | anderer Dienst auf 8080 | Port in `docker-compose.yml` ändern, im NPM nachziehen |

Logs im Zweifel:

```bash
docker compose logs -f --tail 100          # Portfolio
docker logs -f <npm-container-name>        # Proxy
docker logs -f cloudflared                 # Tunnel
```

---

## Schritt 8 — Aktualisieren

```bash
cd ~/docker/julian-portfolio
git pull
docker compose up -d --build
docker image prune -f
```

Weil `index.html` mit `no-cache` ausgeliefert wird und alle Assets einen
Inhalts-Hash im Namen tragen, sehen Besucher die neue Fassung sofort — ohne
den Browser-Cache leeren zu müssen.

---

## Schritt 9 — Zurückrollen

```bash
cd ~/docker/julian-portfolio
git log --oneline -5
git checkout <commit-hash>
docker compose up -d --build
```

Ganz abschalten:

```bash
docker compose down
```

Der Proxy Host im NPM und der Public Hostname in Cloudflare können dabei
bestehen bleiben — sie liefern dann einen Fehler, bis der Container wieder
läuft.

---

## Kurzfassung zum Weitergeben

Falls ein Assistent mit Serverzugriff das übernehmen soll, reicht dieser Text:

> Deploye mein Portfolio auf meinem Homeserver.
>
> - SSH: `julian@192.168.178.70` (Ubuntu 24.04, Docker + Compose vorhanden)
> - Repo: `https://github.com/steju4/julian-portfolio`,
>   Branch `claude/julian-portfolio-site-s19dq5`
> - Ziel: `julian.stengele-home.de`, erreichbar über meinen bestehenden
>   Nginx Proxy Manager und Cloudflare Tunnel
> - DS-Lite-Anschluss, also keine öffentliche IPv4 — Zugriff nur über den Tunnel
>
> Arbeite `DEPLOYMENT.md` im Repo Schritt 0 bis 6 ab. Prüfe zuerst mit
> `ss -tlnp | grep :8080`, ob der Port frei ist, und weiche sonst auf 8090 aus.
> Schritt 5 (Cloudflare-Dashboard) kann ich nur selbst machen — sag mir genau,
> was ich dort eintragen soll, und warte darauf, bevor du Schritt 6 testest.
> Führe nach jedem Schritt die dort angegebene Prüfung aus und brich ab, wenn
> eine fehlschlägt.
