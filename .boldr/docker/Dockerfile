FROM node:7.10.0-alpine

ENV PATH="/app/node_modules/.bin:$PATH" \
    BIND_HOST="0.0.0.0"

    # set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

EXPOSE 2121 5858 9229

# Adds fs-extra to npm and replaces the fs.rename method with the fs.extra
# move method that now automatic chooses what to do (rename/move).
# See https://github.com/npm/npm/issues/9863.
RUN cd $(npm root -g)/npm \
  && npm install fs-extra \
  && sed -i -e s/graceful-fs/fs-extra/ -e s/fs.rename/fs.move/ ./lib/utils/rename.js

RUN mkdir /app
WORKDIR /app

COPY package.json yarn.lock /app/

RUN yarn global add pm2 node-gyp
RUN yarn install --pure-lockfile --no-progress --production && \
  yarn cache clean

COPY . /app/

CMD ["yarn", "start"]

LABEL org.label-schema.license="MIT" \
      org.label-schema.build-date="$(date -u +'%Y-%m-%dT%H:%M:%SZ')" \
      org.label-schema.version="$DOCKER_TAG" \
      org.label-schema.schema-version="$(boldr-version)" \
      org.label-schema.name="BoldrAPI" \
      org.label-schema.description="API for Boldr CMF" \
      org.label-schema.usage="https://github.com/strues/boldr" \
      org.label-schema.url="https://www.boldr.io" \
      org.label-schema.vendor="Boldr" \
      org.label-schema.vcs-ref="$SOURCE_COMMIT" \
      org.label-schema.vcs-url="https://github.com/strues/boldr" \
      org.label-schema.docker.cmd="docker run -ti --rm strues/boldr <code.js>"
