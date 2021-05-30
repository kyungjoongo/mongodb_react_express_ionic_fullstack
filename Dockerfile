FROM node:12

WORKDIR /Users/gilzako/node_js_pjt/express_es6_mongodb_mongoose

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 3000

RUN npm run transpile

RUN npm run transpile2

CMD [ "node", "dist-server/server.js" ]
