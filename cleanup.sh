# Removes the vendor/modules folders before launching start-microservices-sh again

(cd symfony-backend && rm -R database && rm -R var && rm -R vendor) &
(cd node_bot && rm -R node_modules) &
(cd node_S3_simulator && rm -R node_modules)

wait