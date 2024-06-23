FROM node:lts-alpine
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent && mv node_modules ../
RUN cd ./database; npm install --silent && mv node_modules ../; cd ../
COPY . .
EXPOSE 3001
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
