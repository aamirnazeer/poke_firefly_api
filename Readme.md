# README

## Overview

This project is a backend application designed to fetch and display data from the PokéAPI, built using Node.js and Express. The application features pagination, allowing users to fetch Pokémon data in batches and manage their favorite Pokémon with persistence on the backend.

The key functionalities include:

- Fetching Pokémon data from the PokéAPI in paginated batches (15 Pokémon per request).
- Fetching individual Pokémon with options to view details (abilities, types, and evolution options).
- Managing a favorites list through backend endpoints (add, remove, list favorites).
- Using a SQLite database with Drizzle ORM for backend persistence.

---

## Running the Project Locally

### Prerequisites

Make sure you have the following installed on your system:

- Node.js (v22+)
- npm or yarn

### Backend Setup

1. Clone the repository:

```bash
git  clone  https://github.com/aamirnazeer/poke_firefly_api.git
cd  poke_firefly_api
```

2. Install backend dependencies:

```bash
npm  install
or
yarn
```

3. Setup env file:

- Rename `.env.sample` to `.env`

4. Set up the database:

- Create a file in the root of the project `local.db`
- Run the migrations

```bash
npm  run  migrate
or
yarn  migrate
```

5. Start the backend server:

```bash
npm  run  dev
or
yarn  dev
```

By default, the backend runs at `http://localhost:4000`.

## Assumptions

- The PokéAPI data structure remains consistent (e.g., endpoint paths and response formats).
- Pagination is capped at a maximum of 15 Pokémon per request.
- Backend database schema includes necessary tables for persisting favorites.
- Users interact with the application in a single-session mode (no authentication implemented).
- Each new FE session will pass in a unique id for session in headers which is used to map the favourites.
