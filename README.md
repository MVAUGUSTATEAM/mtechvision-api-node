# mtechvision-api

Node.js/Express microservice running behind AWS ALB & ECS Fargate, exposed at:

- **Base URL:** `https://api.mtechvision.com/`

## Tech stack

- Node.js + Express
- CORS with restricted origins
- Basic security headers
- Static files from `/public`
- Deployed as Docker container on ECS Fargate
- Fronted by an HTTPS ALB

## Endpoints

### `GET /`

Basic service check.

```json
{
  "status": "ok",
  "service": "mtechvision-api",
  "message": "Hello from Node.js behind ALB & ECS Fargate 🤘",
  "version": "2.0.0"
}
