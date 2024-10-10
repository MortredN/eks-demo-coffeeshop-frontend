# Build the application
FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

# Set up the production environment
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx
COPY --from=builder /app/dist ./

COPY env.sh /docker-entrypoint.d/env.sh
RUN chmod +x /docker-entrypoint.d/env.sh

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
