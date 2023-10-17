FROM node:alpine3.18
WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
RUN npm install
COPY ./ ./
RUN npm run build
RUN rm -rf ./src

CMD ["npm", "start"]