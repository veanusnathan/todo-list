FROM node:18-slim AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

COPY package*.json ./

EXPOSE 3000

CMD ["npm", "start"]
