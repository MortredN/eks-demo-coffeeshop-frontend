## EKS Demo Coffee Shop - Frontend

This frontend application is a part (or microservice) of an [AWS EKS demo deployment project](https://github.com/MortredN/eks-demo-coffeeshop). This app uses React, Vite and nginx.

### Development environment setup

Clone repository and install dependencies:

```bash
git clone https://github.com/MortredN/eks-demo-coffeeshop-frontend.git
cd eks-demo-coffeeshop-frontend

npm install
```

Add an environment file `.env` for the development environment (Check the `.env.example` file): *Make sure the access & refresh secret on both this and [the other backend](https://github.com/MortredN/eks-demo-coffeeshop-customer) is the same*

```properties
VITE_API_CUSTOMER_URL = http://localhost:4001
VITE_API_SHOPPING_URL = http://localhost:4002
```

Start the app on development:

```bash
npm run dev
```

### Use Docker

[<img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff">](https://hub.docker.com/r/mortredn/eks-demo-coffeeshop-frontend)

You can also run this app as a Docker container using nginx as the web server, serving the production file built with Vite. Either pull from the above public repository or build your own:

```bash
# Pull image
docker pull mortredn/eks-demo-coffeeshop-frontend:latest
docker tag mortredn/eks-demo-coffeeshop-frontend:latest eks-demo-coffeeshop-frontend:latest

# Building from local
docker build -t eks-demo-coffeeshop-frontend:latest .
```

Change the `.env` file, or add the `.env` file to `.dockerignore`, then add a `.env.production` file like this:

```properties
VITE_API_CUSTOMER_URL = MY_APP_API_CUSTOMER_URL
VITE_API_SHOPPING_URL = MY_APP_API_SHOPPING_URL
```

The containerized `env.sh` file will change the `.env` (`.env.production`) file, based on the environment variables given when you run the container:

```bash
# Run the container
docker run --name eks-demo-coffeeshop-frontend
-p 8080:8080 \
-e MY_APP_API_CUSTOMER_URL=http://localhost:4001 `
-e MY_APP_API_SHOPPING_URL=http://localhost:4002 `
-d eks-demo-coffeeshop-frontend:latest
```
