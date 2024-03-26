FROM node:alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN yarn install

COPY apps/auth apps/auth
COPY libs libs

RUN cd apps/auth && yarn install

RUN yarn build auth

FROM node:alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

# 모든 의존성 설치 후 필요 없는 부분 제거
RUN yarn install && yarn cache clean

COPY --from=development /usr/src/app/dist ./dist

CMD ["node","dist/apps/auth/main"]
