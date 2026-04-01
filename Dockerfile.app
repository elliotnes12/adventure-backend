FROM node:20-alpine3.19

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install


COPY . .
RUN chown -R node:node /usr/src/app

USER node

EXPOSE 4000

CMD ["npm", "start"]
