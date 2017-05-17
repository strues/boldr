FROM postgres:9.6.2-alpine

COPY boldr.sql /docker-entrypoint-initdb.d/10-init.sql
COPY boldr_test.sql /docker-entrypoint-initdb.d/20-init.sql
COPY init.1.sh /docker-entrypoint-initdb.d/30-init.sh

RUN chmod +x docker-entrypoint-initdb.d/*.sh

VOLUME ["/var/lib/postgresql/data"]

EXPOSE 5432
CMD ["postgres"]
