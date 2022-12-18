FROM node:alpine

WORKDIR /urs/app

COPY package.json ./

RUN npm i 

COPY . . 

EXPOSE 4000

# CMD ["npm", "start"]

