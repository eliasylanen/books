FROM node:18-alpine

ARG WORKSPACE
ARG PORT

WORKDIR /app

COPY ./package*.json ./
COPY ./$WORKSPACE/package.json ./$WORKSPACE/

RUN npm ci

COPY ./$WORKSPACE ./$WORKSPACE

EXPOSE $PORT

ENV WORKSPACE=$WORKSPACE

CMD npm run start:${WORKSPACE}
