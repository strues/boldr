FROM redis:3.2.8-alpine

# https://github.com/docker-library/healthcheck/blob/master/redis/docker-healthcheck
COPY docker-healthcheck /usr/local/bin/
HEALTHCHECK --interval=5s --timeout=3s \
    CMD ["docker-healthcheck"]

RUN mkdir -p /var/log/redis \
    && chown redis:redis /var/log/redis

COPY sysctl.conf /etc/
COPY redis.conf /usr/local/etc/redis/

CMD [ "redis-server", "/usr/local/etc/redis/redis.conf" ]
