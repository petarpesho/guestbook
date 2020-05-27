FROM node:12

WORKDIR /srv/project
EXPOSE 8080
COPY package.json ./
RUN npm install
COPY ./ ./


CMD ["npm", "start"]