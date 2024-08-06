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
# docker build -t "tabbyofmotivation" .
# docker run -p 8080:8080 tabbyofmotivation

# DEPLOY ON GOOGLE CLOUD RUN
# docker buildx build -t tabbyofmotivation --platform linux/amd64 .
# docker tag tabbyofmotivation gcr.io/tabbyofmotivation/tabbyofmotivation
# docker push gcr.io/tabbyofmotivation/tabbyofmotivation
# Deploy service on GCR