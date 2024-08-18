FROM node:18-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --silent


# COPY . .
# COPY ./.env .

ARG SECRET
ENV SECRET=${SECRET}

EXPOSE 5000

CMD ["npm","start"]