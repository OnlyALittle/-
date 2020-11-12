### nginx.conf

```nginx
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;
	gzip on; #开启或关闭gzip on off
	#gzip_min_length 30k; #gzip压缩最小文件大小，超出进行压缩（自行调节）
	gzip_comp_level 6; #压缩级别:1-10，数字越大压缩的越好，时间也越长
	gzip_types text/plain application/javascript application/json text/css application/xml text/javascript image/jpeg image/gif image/png application/font-woff;
	 #压缩文件类型 

    include /etc/nginx/conf.d/*.conf;
}
```
### config.d/default.conf

```nginx
server {  
     listen       80;  
#     server_name  localhost;  
    listen 443 ssl;
    server_name m.jwjym.top;
#    rewrite ^(.*)$ https://$host$1 permanent;
    root /usr/share/nginx/;
    ssl_certificate conf.d/cert/m.jwjym.top.pem;  #将domain name.pem替换成您证书的文件名称。
    ssl_certificate_key conf.d/cert/m.jwjym.top.key; #将domain name.key替换成您证书的密钥文件名称。
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4; #使用此加密套件。
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2; #使用该协议进行配置。
    ssl_prefer_server_ciphers on;

   location / {  
        root   /usr/share/nginx/html/list;  
        index  index.html index.htm;  
        add_header Access-Control-Allow-Origin *;
        try_files $uri $uri/ /index.html;
    }  

    error_page   500 502 503 504  /50x.html;  
    location = /50x.html {  
        root   /usr/share/nginx/html;  
    }  
}


```


### docker
```js
docker run -d --name nginx -p 8080:80 -v /docker/nginx/logs:/var/log/nginx -v /docker/nginx/html:/usr/share/nginx/html -v /docker/nginx/conf.d:/etc/nginx/conf.d -v /docker/nginx/nginx.conf:/etc/nginx/nginx.conf nginx
```
