FROM node:14.17-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY server ./server
RUN ls -a
RUN npm install
RUN npm run build

## this is stage two , where the app actually runs
FROM node:14.17.0-alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --only=production
COPY --from=0 /usr/src/app/dist .
RUN npm install pm2 -g
EXPOSE 3001
CMD ["pm2-runtime","./dist/index.js"]