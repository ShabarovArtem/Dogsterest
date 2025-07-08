FROM node:22

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY tsconfig.json ./
COPY src/ ./src/

EXPOSE 8080

CMD ["yarn", "start"]
