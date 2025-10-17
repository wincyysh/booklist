# Development Dockerfile
FROM node:18

WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Expose webpack dev server port
EXPOSE 3000

# Run webpack dev server
CMD ["npm", "start"]
