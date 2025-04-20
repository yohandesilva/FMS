# Navigate to the client directory
cd client

# Install front-end dependencies (if not already installed)
#npm install

# Build the React app (creates a production-ready build in the 'build' folder)
npm run build

# Navigate back to the root directory
cd ..

# Copy the build files to the server/public directory
Copy-Item -Path client/build/* -Destination server/public -Recurse -Force

# Print a success message
Write-Output "React app built and copied to server/public!"