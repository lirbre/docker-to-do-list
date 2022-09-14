FROM node:alpine

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /

RUN yarn install

COPY . /app

EXPOSE 3000

CMD ["yarn", "dev"]