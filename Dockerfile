FROM node:8.0.0-alpine

ARG PORT=8080
ENV PORT $PORT
EXPOSE $PORT 5858 9229

RUN mkdir -p /opt/app
# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

# Set a working directory
WORKDIR /opt
COPY package.json /opt
RUN yarn install --pure-lockfile --no-progress
ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . /opt/app
