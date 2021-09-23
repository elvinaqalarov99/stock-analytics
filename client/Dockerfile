#stage 1
FROM node:12.17-alpine AS build

WORKDIR /client

COPY package.json ./
RUN npm install
COPY . .

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN npm run build

#stage 2
FROM nginx:1.17.0-alpine

COPY --from=build /client/build /usr/share/nginx/html
COPY --from=build /client/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE $REACT_DOCKER_PORT

CMD nginx -g 'daemon off;'
