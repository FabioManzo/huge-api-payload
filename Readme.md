# Documentation

## Services

There are 3 different projects:

### Node Bot: 
- simulates the scraping of a payload (variable in size)
- sends the payload to the *Node S3 simulator*
- sends the link generated by the *Node S3 simulator* to the *Symfony Backend* (the Symfony backend acts as the API Gateway that has a limit of 10MB)  

### Node S3 Simulator
- Receives a Payload of any size and stores it in a public folder
- Returns the URL of the saved json file

### Symfony Backend
- Acts as the API Gateway
- Exposes an API to save the url of the huge payload to download
- It has a command that:
  - download in stream the payload from the *Node S3 simulator*
  - loads the Flyers in its database, in chunks

## Instructions to start the microservices with the ssh script
From the root of the project:

`./start-microservices.sh` to build and start all the Docker containers 

### _symfony-backend_ (install dependencies and the create the database)
Enter the _symfony-backend_ project with:

`cd symfony-backend`

`docker-compose exec php8_symfony bash` to enter the container of the _symfony-backend_

`composer install` from inside the container of the _symfony-backend_

`bin/console doctrine:migrations:migrate` from inside the container of the _symfony-backend_, to create the tables

`exit` to exit the container

### _node_S3_simulator_
Enter the _node_S3_simulator_ project with:

`cd ../node_S3_simulator`

`docker-compose exec node_backend bash` to enter the container of the _node_S3_simulator_

`npm start` from inside the container of the node_bot

### _node_bot_
Open another terminal and enter the _node_bot_ project with:

`cd ../node_bot`

`docker-compose exec node_bot bash` to enter the container of the _node_bot_

`npm start` from inside the container of the node_bot

Run it several times and you will see two things: 

1. inside the _node_S3_simulator_ project, in the uploads folder, the payloads.
2. inside the _symfony-backend_ database, in the payload table, the links generated by _node_S3_simulator_ API

`exit` to exit the container

### _symfony-backend_
To import the flyers in the database, enter the _symfony-backend_ project with:

`cd ../symfony-backend`

`docker exec -it php8_symfony bash` to enter the container of the _symfony-backend_

`bin/console app:import-payload` to start the command that imports in bulks the flyers (in production this would be a scheduled cron task)

Check the flyer table to see the imported flyers.

Run several times, until it imports all the flyers in the flyer table and then passes to the next payload.

