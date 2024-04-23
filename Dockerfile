FROM node:21-alpine3.18 AS builder
COPY . /app
WORKDIR /app
RUN npm install 
RUN npm run build
EXPOSE 8080
CMD ["node", "dist/apps/server/main.js"]