# Use Node 12
FROM node:12-slim AS build

# Create a folder for our app
RUN mkdir /app

# Set up the working directory
WORKDIR /app

# Copy our package.json file first, then run `npm install`.
# This is an optimization we can make, as this layer will be
# cached, meaning that if we don't change the package.json file,
# this step doesn't need to be performed again
COPY package.json .

# Note that we're installing all dependencies, unlike the buildpack
RUN yarn install

# Copy the rest of the application
COPY . .

# set the argument default
ARG SEARCH_URL
ARG SEARCH_KEY
ARG API_URL
ARG SAMPLE_DATA

# assign them as environmental variables
ENV SEARCH_URL ${SEARCH_URL}
ENV SEARCH_KEY ${SEARCH_KEY}
ENV API_URL ${API_URL}
ENV SAMPLE_DATA ${SAMPLE_DATA}}

# Build the Vue.js application. It will output static files
# Into the /dist folder
RUN yarn generate

# ---------------

# Create a second-stage which copies the /dist folder
# and uses http-server to host the application
FROM flashspys/nginx-static

RUN apk update && apk upgrade

COPY --from=build /app/dist /static
# COPY ./dist /static
