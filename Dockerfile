FROM node:latest as build

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80