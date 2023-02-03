FROM node:18-alpine

# bind your app to the gateway IP
# ENV HOST=0.0.0.0

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json /app/

# install nodemon
RUN npm install -g ts-node
RUN npm install -g nodemon

# install project dependencies
RUN npm install

EXPOSE 3001