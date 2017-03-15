FROM strues/alpine-node:7

# Switch to project directory
WORKDIR /app
COPY package.json yarn.lock /app/

RUN yarn install --pure-lockfile --no-progress --production && \
  yarn cache clean

COPY . /app

VOLUME ["/app/node_modules", "/app/public"]
EXPOSE 3000
CMD ["yarn", "start"]
