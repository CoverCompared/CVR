docker rm -f explorer
docker run -e APP_NODE_URL="http://localhost:8545" -p 80:80 -d --name=explorer alethio/ethereum-lite-explorer