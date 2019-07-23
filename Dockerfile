FROM node:8.14.0-alpine

LABEL maintainer "irfan andriansyah <irfanandriansyah10@gmail.com>"

RUN apk add bash
WORKDIR /usr/app

COPY package.json .
RUN npm install

COPY . .
