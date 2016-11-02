Using Docker and Boldr in harmony
=====================

Boldr is developed for usage with Docker and Docker Compose.

Nginx
======

Nginx is setup to mount `volumes/www` and serve static content from `volumes/www/public`. 

Develop with a local SSL certificate that is *trusted* by doing the following:
`sudo security add-trusted-cert -p ssl -d -r trustRoot -k ~/Library/Keychains/login.keychain CERTNAME.crt`

If you use a domain like boldr.dev, you will want to modify your host records so that the url you visit matches the domain on the ssl certificate.

`sudo nano /etc/hosts` and add the following:  `127.0.0.1    DOMAIN.dev` 


Redis
======
The Redis container is built upon Alpine Linux 3.4 and running Redis v3.2.3. It is bound
to `0.0.0.0` and runs as a non-root user, **redis**.

Commands
----

Using the default configuration.
```
$ docker run -d --name boldr_redis -v <docker_volume_name>:/data strues/redis
```

Using your own `redis.conf` file
```
$ docker run -d --name boldr_redis -v <docker_volume_name>:/data \
-v <redis_conf_file>:/usr/local/etc/redis/redis.conf strues/redis
```


Postgres
=========
The Postgres container is built upon Alpine Linux 3.4.

Commands
----
