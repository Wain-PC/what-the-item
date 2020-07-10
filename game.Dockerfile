# Game Frontend Build
FROM node:alpine as frontend
RUN mkdir /app
WORKDIR /app

COPY ./game/package.json /app
COPY ./game/package-lock.json /app
WORKDIR /app
RUN npm ci
COPY ./game /app
ENV GENERATE_SOURCEMAP false
RUN npm run build

# Run server
EXPOSE 3000
CMD [ "npm", "run", "start" ]
