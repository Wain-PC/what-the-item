# Admin Frontend Build
FROM node:alpine as frontend
RUN mkdir /build
WORKDIR /build

COPY ./admin/package.json /build
COPY ./admin/package-lock.json /build
WORKDIR /build
RUN npm ci
COPY ./admin/public /build/public
COPY ./admin/src /build/src
ENV GENERATE_SOURCEMAP false
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
EXPOSE 3334
ENV NODE_ENV admin
CMD [ "node", "/app/app.js" ]