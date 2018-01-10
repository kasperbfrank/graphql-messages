FROM node

ENV NPM_CONFIG_LOGLEVEL warn

RUN yarn add global nodemon

WORKDIR /usr/app
COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn

COPY . .

CMD yarn start