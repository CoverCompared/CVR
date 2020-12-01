docker rm -f cvr
docker build -t polkacover .
# sleep 5
docker rmi -f `docker images -f "dangling=true" -q`
docker run -v ${PWD}:/home/app -d --name=cvr polkacover
docker exec -it cvr bash
