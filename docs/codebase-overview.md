# Codebase Overview

This repository is organized as a small monorepo with two applications, a set of shared packages, and a browser-facing frontend that talks to the document-generation flow.

## Main Areas

- `apps/api`: standalone Express API server.
- `apps/web`: web server that renders the UI and can optionally mount the API routes internally.
- `packages/core`: Core logic for this project.
- `packages/handlers`: request-level business logic used by both apps.
- `packages/utils`: shared utility functions for validation, parsing, token counting, and context loading, etc.
- `scripts/cli`: local debugging tools for inspecting generated DOCX files.

## Entry Points

- [apps/api/index.js](../apps/api/index.js)
- [apps/web/index.js](../apps/web/index.js)
- [packages/core/index.js](../packages/core/index.js)
- [packages/handlers/index.js](../packages/handlers/index.js)
- [packages/utils/index.js](../packages/utils/index.js)
- [scripts/cli/index.js](../scripts/cli/index.js)

## What Connects Everything

The web app renders the UI and serves static assets from `public/` and `node_modules/sweetalert2/dist`. The handlers then orchestrate AI-assisted text generation and DOCX creation by calling the shared core and utility packages.

The most important runtime pieces are:

- `OpenAIWrapper` for chat completions and context loading.
- `VMRunner` for safely evaluating generated document code.
- `handleAutoFillAI` for text autofill requests.
- `handleGenerateDocx` for producing the final document buffer.
