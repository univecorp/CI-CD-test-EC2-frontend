# Stage 1: Build the Node.js application
FROM node:alpine as nodework
WORKDIR /myapp
COPY package.json .

RUN yarn install
COPY . .
RUN yarn build

# Stage 2: Create the Nginx image
FROM nginx:1.23-alpine

# Copy the built files from the nodework stage to the nginx stage
COPY --from=nodework /myapp/build /usr/share/nginx/html

# Configure Nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
