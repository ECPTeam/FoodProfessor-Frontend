FROM node:14.15.4-alpine3.10

WORKDIR /usr/src/food_professor/react-app

COPY package.json ./

RUN yarn install

COPY . .