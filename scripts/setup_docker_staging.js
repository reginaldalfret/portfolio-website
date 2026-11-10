const fs = require('fs');
const path = require('path');

const deployDir = path.resolve('deploy');
fs.mkdirSync(deployDir, { recursive: true });

// 1. Buffalo Dockerfile
const buffaloDocker = `FROM golang:1.24-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o portfolio-buffalo .

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/portfolio-buffalo /app/portfolio-buffalo
COPY --from=builder /app/templates /app/templates
COPY --from=builder /app/public /app/public
ENV PORT=8087
ENV GO_ENV=production
EXPOSE 8087
CMD ["/app/portfolio-buffalo"]
`;
fs.writeFileSync(path.join(deployDir, 'Dockerfile.buffalo'), buffaloDocker, 'utf8');
fs.writeFileSync('E:/Portfolio-Buffalo/Dockerfile', buffaloDocker, 'utf8');

// 2. Vapor Dockerfile
const vaporDocker = `FROM swift:6.0-jammy AS builder
WORKDIR /app
COPY Package.swift ./
COPY Sources/ Sources/
COPY Public/ Public/
RUN swift build -c release

FROM swift:6.0-jammy-slim
WORKDIR /app
COPY --from=builder /app/.build/release/App /app/App
COPY --from=builder /app/Public /app/Public
ENV PORT=8086
EXPOSE 8086
CMD ["/app/App", "serve", "--env", "production", "--hostname", "0.0.0.0", "--port", "8086"]
`;
fs.writeFileSync(path.join(deployDir, 'Dockerfile.vapor'), vaporDocker, 'utf8');
fs.writeFileSync('E:/Portfolio-Vapor/Dockerfile', vaporDocker, 'utf8');

// 3. Django Dockerfile
const djangoDocker = `FROM python:3.13-slim
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt gunicorn
COPY . .
EXPOSE 8000
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "2"]
`;
fs.writeFileSync(path.join(deployDir, 'Dockerfile.django'), djangoDocker, 'utf8');
fs.writeFileSync('E:/Portfolio-Django/Dockerfile', djangoDocker, 'utf8');

// 4. Laravel Dockerfile
const laravelDocker = `FROM php:8.4-cli-alpine
WORKDIR /app
RUN docker-php-ext-install pdo pdo_mysql bcmath || true
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
COPY composer.json composer.lock* ./
RUN composer install --no-dev --optimize-autoloader --no-scripts --ignore-platform-reqs || true
COPY . .
EXPOSE 8001
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8001"]
`;
fs.writeFileSync(path.join(deployDir, 'Dockerfile.laravel'), laravelDocker, 'utf8');
fs.writeFileSync('E:/Portfolio-Laravel/Dockerfile', laravelDocker, 'utf8');

// 5. Rails Dockerfile
const railsDocker = `FROM ruby:3.4-slim
WORKDIR /app
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev git
COPY Gemfile Gemfile.lock ./
RUN bundle install
COPY . .
ENV RAILS_ENV=production
ENV RAILS_SERVE_STATIC_FILES=true
ENV RAILS_LOG_TO_STDOUT=true
EXPOSE 3000
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "3000"]
`;
fs.writeFileSync(path.join(deployDir, 'Dockerfile.rails'), railsDocker, 'utf8');
fs.writeFileSync('E:/Portfolio-Rails/Dockerfile', railsDocker, 'utf8');

// 6. Spring Boot Dockerfile
const springDocker = `FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY target/portfolio-0.0.1-SNAPSHOT.jar app.jar
ENV SERVER_PORT=8082
EXPOSE 8082
CMD ["java", "-jar", "app.jar", "--server.port=8082"]
`;
fs.writeFileSync(path.join(deployDir, 'Dockerfile.springboot'), springDocker, 'utf8');
fs.writeFileSync('E:/Portfolio-SpringBoot/Dockerfile', springDocker, 'utf8');

// 7. Compose file
const compose = `version: '3.8'

services:
  buffalo:
    build:
      context: E:/Portfolio-Buffalo
      dockerfile: Dockerfile
    container_name: polyglot-buffalo
    ports:
      - "8087:8087"
    restart: unless-stopped

  django:
    build:
      context: E:/Portfolio-Django
      dockerfile: Dockerfile
    container_name: polyglot-django
    ports:
      - "8000:8000"
    restart: unless-stopped

  laravel:
    build:
      context: E:/Portfolio-Laravel
      dockerfile: Dockerfile
    container_name: polyglot-laravel
    ports:
      - "8001:8001"
    restart: unless-stopped

  springboot:
    build:
      context: E:/Portfolio-SpringBoot
      dockerfile: Dockerfile
    container_name: polyglot-springboot
    ports:
      - "8082:8082"
    restart: unless-stopped

  rails:
    build:
      context: E:/Portfolio-Rails
      dockerfile: Dockerfile
    container_name: polyglot-rails
    ports:
      - "3000:3000"
    restart: unless-stopped
`;
fs.writeFileSync(path.join(deployDir, 'docker-compose.staging.yml'), compose, 'utf8');

console.log('Staging Dockerfiles and docker-compose.staging.yml created successfully!');
