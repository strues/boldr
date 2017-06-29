# NGINX Configuration

Configuring a reverse proxy correctly is an important step toward Boldr to work for you. The following example configurations for an NGINX reverse proxy. Reminder, this is not a full NGINX configuration.

### BoldrCMS
These settings are for the CMS and the Express server handling the rendering. The example below illustrates using NGINX to handle proxying and static asset serving.

**Define Upstream:**   
```nginx
upstream boldrcms {
  ## your server's IP or the docker container works as well.
  server 0.0.0.0:3000;
}
server {}
```

Everything below is inside the server block.

**Proxy to SSR:**    
We try files at the root level (yoursite.com/robots.txt), then push to the proxied application if no matches are found.

```nginx
# try files at the root level, then push to proxy
location / {
  try_files $uri  @proxy;
}
# our SSR
location @proxy {
  proxy_pass http://boldrcms;
  proxy_hide_header X-Powered-By;
  proxy_redirect off;
  proxy_cache_valid 200 30m;
  proxy_cache_valid 404 1m;
  proxy_cache_key               sfs$request_uri$scheme;
  proxy_set_header              X-Real-IP $remote_addr;
  proxy_set_header              X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header              X-Forwarded-Proto $scheme;
  proxy_set_header              Upgrade $http_upgrade;
  proxy_set_header              Host $http_host;
  proxy_set_header              X-NginX-Proxy true;
  proxy_ignore_headers          X-Accel-Expires Expires Cache-Control;
  expires                       10m;
}
```

**Serve Assets:**    
Here we tell NGINX for every request to /assets/* to handle serving the file.

```nginx
  # serve assets using nginx and not Express
  location /assets {
    ## full path to the client directory
    alias /var/www/boldr/staging.boldr.io/build/assets/;
    access_log off;
    log_not_found off;
    expires max;
    autoindex on;
  }
```

**Serve the Service Worker:**    
We make sure the service worker is not cached.

```nginx
  location /sw.js {
    ## full path to the sw.js file
    alias /var/www/boldr/staging.boldr.io/boldrCMS/client/sw.js;
    add_header Cache-Control "no-cache";
    proxy_cache_bypass $http_pragma;
    proxy_cache_revalidate on;
    expires off;
    access_log off;
  }
```
