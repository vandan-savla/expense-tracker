FROM node:18-alpine as build

WORKDIR /app

COPY package*.json .

RUN npm install --silent

COPY . .

RUN npm run build


FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/build .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
