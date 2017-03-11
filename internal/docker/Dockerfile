FROM mhart/alpine-node:7

RUN apk update && \
  apk add --no-cache \
    bash \
    curl \
    tar \
    g++ \
    gcc \
    git \
    libev-dev \
    libevent-dev \
    libuv-dev \
    zlib-dev \
    openssl-dev \
    make && \

  curl -o- -L https://yarnpkg.com/install.sh | bash && \
  apk del bash curl tar

# set path to include yarn
ENV PATH /root/.yarn/bin:$PATH
# Switch to project directory
WORKDIR /app
COPY package.json yarn.lock /app/

RUN yarn install --pure-lockfile --no-progress --production && \
  yarn cache clean

COPY . /app

VOLUME ["/app/node_modules", "/app/public"]
EXPOSE 3000
CMD ["yarn", "start"]
