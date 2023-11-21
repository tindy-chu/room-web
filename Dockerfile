# builder
FROM node:20.9.0-bullseye-slim AS builder
WORKDIR /usr/src/app
COPY . .

RUN apt-get update -y

RUN yarn
RUN yarn build

# run
FROM nginx:1.25.3-alpine
RUN rm -rf /etc/nginx/conf.d/*
COPY --from=builder /usr/src/app/config/nginx.conf /etc/nginx/conf.d

WORKDIR /var/www/html
COPY --from=builder /usr/src/app/dist ./
COPY --from=builder /usr/src/app/.env /usr/src/app/script/gen-env.sh ./
RUN chmod +x /var/www/html/gen-env.sh

EXPOSE 80

CMD ["sh", "-c", ". /var/www/html/gen-env.sh && nginx -g \"daemon off;\""]
