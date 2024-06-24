FROM node:lts-alpine
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
WORKDIR /users_microservice
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent && mv node_modules ../
COPY . .
RUN chown -R node /users_microservice
USER node
CMD ["npm", "start"]
