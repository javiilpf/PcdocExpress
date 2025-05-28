FROM php:8.2-fpm-alpine

# Instalar dependencias
RUN apk add --no-cache \
    git \
    zip \
    unzip \
    libzip-dev \
    icu-dev

# Instalar extensiones PHP
RUN docker-php-ext-install pdo pdo_mysql zip intl

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copiar archivos del proyecto
COPY . .

# Instalar dependencias
RUN composer install --no-interaction --optimize-autoloader --no-scripts

# Configurar permisos
RUN chown -R www-data:www-data var

# ...existing code...
RUN chown -R www-data:www-data var
# ...existing code...

EXPOSE 8000

CMD ["php", "-S", "0.0.0.0:8000", "-t", "public"] 