FROM node
RUN mkdir /app
WORKDIR /app

# Server
COPY ./server/package.json /app
COPY ./server/package-lock.json /app
RUN npm ci
COPY ./server /app

# Game
RUN mkdir ./static/game
COPY ./game/package.json /app/static/game
COPY ./game/package-lock.json /app/static/game
WORKDIR /app/static/game
RUN npm ci
COPY ./game /app/static/game
RUN npm run build

# Admin
RUN mkdir ./static/admin
COPY ./admin/package.json /app/static/admin
COPY ./admin/package-lock.json /app/static/admin
WORKDIR /app/static/admin
RUN npm ci
COPY ./admin /app/static/admin
RUN npm run build

# Run server
EXPOSE 3333
CMD [ "node", "/app/app.js" ]