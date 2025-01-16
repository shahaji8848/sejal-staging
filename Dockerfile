# Use a specific version of Node.js
FROM node:20 AS build

# Install system dependencies for sharp
RUN apt-get update && apt-get install -y \
    build-essential \
    libcups2-dev \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including sharp)
RUN npm install
RUN npm i sharp

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
