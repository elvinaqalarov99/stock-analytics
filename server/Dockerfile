FROM node:12.17-alpine

WORKDIR /server

COPY package.json ./
COPY tsconfig.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "start"]