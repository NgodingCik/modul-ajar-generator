# Applications

This project has two Express applications under `apps/`.

## API Application

The API server entry point is [apps/api/index.js](../apps/api/index.js).

It loads environment variables, creates an Express app, and registers these middleware layers:

- request body parsing with `express.urlencoded()` and `express.json()`
- rate limiting
- security headers with Helmet
- CORS

Routes are loaded dynamically from [apps/api/routes/index.js](../apps/api/routes/index.js), which discovers files under `apps/api/routes/` and mounts exported `AppRoute` instances.

The API currently exposes:

- `POST /autofill-ai`
- `POST /generate-docx`

## Web Application

The web server entry point is [apps/web/index.js](../apps/web/index.js).

It shares the same basic request parsing and protection middleware as the API app, and adds:

- EJS templating
- console stripping middleware for production rendering
- static file serving from `public/`
- static file serving from `node_modules/sweetalert2/dist`

If `APP_USE_BUILTIN_API=true`, the web app also mounts the API routes internally so the browser can use one server for both pages and API requests.

The web routes are loaded dynamically from [apps/web/routes/index.js](../apps/web/routes/index.js).

Important web routes include:

- `GET /` for the home page
- `GET /hello` for a simple health-style response
- `POST /autofill-ai`
- `POST /generate-docx`

## Environment Variables

Common runtime variables used by both apps include:

- `APP_HOST`
- `APP_PORT`
- `APP_USE_BUILTIN_API`
- `APP_API_BASE_URL`
- `BASE_URL`
- `OPENAI_API_KEY`
- `OPENAI_MODEL`
- `OPENAI_BASE_URL`
