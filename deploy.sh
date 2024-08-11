docker buildx build -t tom --platform linux/amd64 .
docker tag tom gcr.io/tabbyofmotivation/tom
docker push gcr.io/tabbyofmotivation/tom