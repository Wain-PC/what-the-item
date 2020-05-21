# Game Frontend Build
FROM node:alpine as frontend
RUN mkdir /build
WORKDIR /build

COPY ./game/package.json /build
COPY ./game/package-lock.json /build
WORKDIR /build
RUN npm ci
COPY ./game /build
RUN npm run build

# Server installation
FROM node:alpine as server
RUN mkdir /app
WORKDIR /app
COPY ./server/package.json /app
COPY ./server/package-lock.json /app
RUN npm ci
COPY ./server /app
COPY --from=frontend /build/build/ /app/static/

# Run server
EXPOSE 3333
ENV NODE_ENV user
CMD [ "node", "/app/app.js" ]