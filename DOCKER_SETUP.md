# How to run(Docker version)

- run postgres server
  (persist data)

```
docker run -p 5432:5432 --name postgresserver -d \
-e POSTGRES_PASSWORD=postgres \
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
-e POSTGRES_PASSWORD=postgres \
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

- Build Nextjs server

```
docker build -t url-shortener-frontend .
```

- run Nextjs server

```
docker run -it --name urlshortfront --rm \
-v ${PWD}:/app \
-v /app/node_modules \
-p 3000:3000 \
-e CHOKIDAR_USEPOLLING=true \
url-shortener-frontend
```

- Build Nodejs server

```
docker build -t url-shortener-backend .
```

- Run Nodejs server

```
docker run --name url-short-back -p 5000:5000 url-shortener-backend
```
