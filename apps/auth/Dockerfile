FROM node:18.19.0-alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN yarn install

COPY apps/auth apps/auth
COPY libs libs

RUN cd apps/auth && yarn install

RUN yarn build auth

FROM node:18.19.0-alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install --prod
RUN yarn add semver

COPY --from=development /usr/src/app/dist ./dist

CMD ["node","dist/apps/auth/main"]
