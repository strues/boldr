FROM mhart/alpine-node
MAINTAINER Steven Truesdell <steven@strues.io>

RUN \
  apk add --no-cache make gcc g++ python && \
  mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --production

# Bundle app source
COPY . /usr/src/app/
RUN apk del make gcc g++ python && rm -rf /tmp/*
# run application
EXPOSE 3000

CMD ["npm", "run", "start"]
