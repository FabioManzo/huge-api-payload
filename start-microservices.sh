## Start Docker

# the network that will let the containers communicate with each other
if ! docker network ls | grep -q "fabiomanzo_network"; then
    echo "Creating Docker network fabiomanzo_network..."
    docker network create fabiomanzo_network &
else
    echo "Docker network fabiomanzo_network already exists."
fi

# symfony-backend
echo "Starting docker compose symfony-backend..."
(cd symfony-backend && docker compose build && docker compose up -d) &

# node_bot 
echo "Starting docker compose node_bot..."
(cd node_bot && docker compose build && docker compose up -d) &

# node_S3_simulator 
echo "Starting docker compose node_S3_simulator..."
(cd node_S3_simulator && docker compose build && docker compose up -d) &

wait