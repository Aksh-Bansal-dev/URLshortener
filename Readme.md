# URL Shortener

Shortens URLs.

## Technologies used

- Nextjs
- Nodejs
- Postgres
- Docker

## How to use(manual)

- Start postgres server using docker
  (persist data)

```
docker run -p 5432:5432 --name postgresserver -d \
-e POSTGRES_PASSWORD=password \
-e POSTGRES_USER=postgres \
-e POSTGRES_DB=shorturl \
-v /var/lib/postgresql/data \
postgres
```

OR

- run postgres server
  (non-persist data)

```
docker run -p 5432:5432 --name postgresserver -d \
-e POSTGRES_PASSWORD=password \
-e POSTGRES_USER=postgres \
-e POSTGRES_DB=shorturl \
postgres
```

- Create table in postgres server

```
docker exec -it postgresserver psql -d shorturl -U postgres
```

```
CREATE TABLE urls ( ID SERIAL PRIMARY KEY, URL VARCHAR(100));
```

- Start backend server using `npm run dev`.
- Start frontend server using `npm run dev`.
- Visit [website](http://localhost:3000).

## How to use (Docker edition)

[Docker setup]()
