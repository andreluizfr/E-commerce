FROM node:16.15

WORKDIR /web-app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 3000

CMD serve -s build