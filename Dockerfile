FROM nginx:alpine

WORKDIR /var/www
EXPOSE 8080
RUN apk update && apk add --no-cache git && \
    git clone https://github.com/httpcats/http.cat.git

ADD nginx.conf /etc/nginx/nginx.conf
