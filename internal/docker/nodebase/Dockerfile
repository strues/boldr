FROM mhart/alpine-node:7

RUN apk update && \
  apk add --no-cache \
    bash \
    curl \
    tar \
    g++ \
    gcc \
    git \
    zlib-dev \
    openssl-dev \
    make && \

  curl -o- -L https://yarnpkg.com/install.sh | bash && \
  apk del bash curl tar

# set path to include yarn
ENV PATH /root/.yarn/bin:$PATH
