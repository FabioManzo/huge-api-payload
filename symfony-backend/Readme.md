# Documentation

## Instructions for starting the backend

`docker-compose build`

`docker-compose up -d`

`docker-compose exec php8_symfony bash`

`composer install` from within the container php8_symfony

`bin/console doctrine:migrations:migrate` from inside the container, to create the tables