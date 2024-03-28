FROM node:18.19.0-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn install

CMD ["yarn", "test"]
