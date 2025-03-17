# backend/Dockerfile
FROM docker.io/library/php:8.2-fpm
# システムの依存関係インストール
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# PHPの拡張機能インストール
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Composerインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 作業ディレクトリ設定
WORKDIR /var/www/html

# ユーザー権限設定
RUN chown -R www-data:www-data /var/www/html