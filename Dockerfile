# Install base
FROM node:hydrogen-alpine3.19 as builder

# Set a workdir
WORKDIR /app

# Install dependencies
COPY frontend/package.json .
RUN npm install 

# Copy the rest of the code
COPY ./frontend/ .

# Build the app
FROM nginx:stable-alpine3.17-slim
COPY --from=builder /app/build /usr/share/nginx/html

# To deply: docker build .
# To run: docker run -p 8080:80 <img_id>