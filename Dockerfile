FROM nginx:alpine

COPY environment.json.template /tmp/environment.json.template
COPY nginx.conf.template /tmp/nginx.conf.template

WORKDIR /usr/share/nginx/html
COPY dist/movie-angular-app .

CMD envsubst < /tmp/environment.json.template > /usr/share/nginx/html/assets/environments/environment.json \
  && envsubst '\$GATEWAY_IP' < /tmp/nginx.conf.template > /etc/nginx/nginx.conf \
  && exec nginx -g 'daemon off;'
