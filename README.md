# Module federation building example

Simple module federation app based on two apps

## Architecture

          ┌────────> host app <────┐
gateway ──┤                        │ exported component 
          └────────> remote app ───┘

## Quick Start

### Prerequisites
- Docker & Docker Compose

### Start All Services
```bash
docker compose up -d
```

### Access UIs
- **Main UI**: http://localhost:80

### Cleanup
```bash
docker compose down
```
