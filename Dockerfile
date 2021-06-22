FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install --save amqplib
RUN npm install

COPY . .

EXPOSE 3334

CMD ["yarn", "start"]

# docker build -t solid-api2 .
# docker run -p 3334:80 solid-api2
