FROM php:8.4-cli-alpine
WORKDIR /app
COPY . .
EXPOSE 8001
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8001"]
