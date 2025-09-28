# 1. Use an official Node.js image as the base
FROM node:20

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package.json and package-lock.json (for dependency install)
# The first argument is the source path, relative to the context (the backend folder)
COPY package*.json ./
COPY package-lock.json .

# 4. Install dependencies
RUN npm install --only=production

# 5. Copy the rest of the application code
# The first argument is the source path, relative to the context (the backend folder)
COPY . .

# 6. Expose the port your Express server listens on (e.g., 3000 or 5000)
# IMPORTANT: Make sure this port matches the port defined in your Express app (e.g., `const PORT = process.env.PORT || 3000;`)
EXPOSE 5000

# 7. Command to start the server
CMD ["npm", "start"]