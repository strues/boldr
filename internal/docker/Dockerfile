FROM mhart/alpine-node:7

ARG uid=1000
ARG VERSION=0.20.3

RUN apk update && \
  apk add --no-cache \
    curl \
    gnupg \
    g++ \
    gcc \
    git \
    libev-dev \
    libevent-dev \
    libuv-dev \
    openssl-dev \
    make \
    openssl-dev \
    python && \

  gpg  --keyserver ha.pool.sks-keyservers.net --recv-keys 9D41F3C3 && \
  curl -o /tmp/yarn-${VERSION}.tar.gz -sSL https://yarnpkg.com/latest-rc.tar.gz && \
  curl -o /tmp/yarn-${VERSION}.tar.gz.asc -sSL https://yarnpkg.com/latest-rc.tar.gz.asc && \
  gpg --verify "/tmp/yarn-${VERSION}.tar.gz.asc" /tmp/yarn-${VERSION}.tar.gz

WORKDIR /opt
RUN tar xzf /tmp/yarn-${VERSION}.tar.gz && \
    mv /opt/dist /opt/yarn && \
    ln -sf /opt/yarn/bin/yarn /bin/yarn && \
    rm -rf /root/.gnupg /tmp/yarn-${VERSION}.tar.gz /tmp/yarn-${VERSION}.tar.gz.asc \
    /opt/yarn/end_to_end_tests && \
    apk del --no-cache curl gnupg && \
    npm install -g node-gyp && \
    mkdir /app

# Switch to project directory
WORKDIR /app
COPY package.json /app

RUN yarn install --production
COPY . /app

ENV NODE_ENV production

EXPOSE 3000
VOLUME ["/app/node_modules", "/app/public"]
CMD ["npm", "run", "start"]
