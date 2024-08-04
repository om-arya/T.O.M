FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    gcc \
    g++ \
    libpq-dev \
    python3-dev \
    libffi-dev \
    libssl-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/
RUN pip3 install --no-cache-dir -r requirements.txt

COPY . /app/

RUN python3 manage.py collectstatic --noinput

EXPOSE 8080

CMD ["python3", "manage.py", "runserver", "0.0.0.0:8080"]

# BUILD IMAGE AND RUN CONTAINER:
# docker build -t "tom" .
# docker run -p 8080:8080 tom

# DEPLOY ON GOOGLE CLOUD RUN
# docker buildx build -t tom --platform linux/amd64 .
# docker tag tom gcr.io/tabbyofmotivation/tom
# docker push gcr.io/tabbyofmotivation/tom
# gcloud run deploy tom-service --image gcr.io/tabbyofmotivation/tom --platform managed --region us-east4 --allow-unauthenticated