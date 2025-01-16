FROM node:20 AS build

# Set the working directory in the container
WORKDIR /app

# Install dependencies and build tools for sharp
RUN apt-get update && apt-get install -y \
    build-essential \
    libvips-dev

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port Next.js will run on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
