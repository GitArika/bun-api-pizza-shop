# pizza-shop

This project is a simple pizza shop API built using Bun, Elysia, and Drizzle
ORM.

## Prerequisites

- [Bun](https://bun.sh) v1.2.3 or later
- Docker (for running PostgreSQL)

## Installation

To install dependencies, run:

```bash
bun install
```

## Running the Project

To start the development server, run:

```bash
bun dev
```

To build the project, run:

```bash
bun build
```

To start the production server, run:

```bash
bun start
```

## Database Setup

To set up the database, you need to have Docker installed. You can start the
PostgreSQL service using Docker Compose:

```bash
docker-compose up -d
```

### Migrations

To run database migrations, use:

```bash
bun generate && bun migrate
```

### Seeding

To seed the database with initial data, use:

```bash
bun seed
```

## Linting

To lint the code, run:

```bash
bun lint
```
