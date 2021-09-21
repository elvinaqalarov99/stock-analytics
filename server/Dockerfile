FROM node:14.17-alpine AS build

RUN mkdir -p /usr/app/
WORKDIR /usr/app/

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:14.17-alpine
WORKDIR /usr/app/

COPY package*.json .
RUN npm install --production

COPY --from=build /usr/app/dist/ dist/

EXPOSE 5000

CMD ["npm","run","start"]
