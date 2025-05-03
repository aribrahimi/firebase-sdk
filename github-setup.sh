#!/bin/bash

# This script helps set up the GitHub repository for Firebase Auth SDK

# Initialize git repository if not already initialized
if [ ! -d ".git" ]; then
  echo "Initializing Git repository..."
  git init
  echo "Git repository initialized."
else
  echo "Git repository already initialized."
fi

# Add all files to git
echo "Adding files to Git..."
git add .

# Initial commit
echo "Creating initial commit..."
git commit -m "Initial commit: Firebase Auth SDK"

# Instructions for setting up remote
echo ""
echo "-----------------------------------------------------"
echo "To complete setup, create a repository on GitHub and then run:"
echo ""
echo "  git remote add origin https://github.com/yourusername/firebase-auth-sdk.git"
echo "  git branch -M main"
echo "  git push -u origin main"
echo ""
echo "Replace 'yourusername' with your GitHub username."
echo "-----------------------------------------------------"
echo ""

echo "Setup completed successfully!" 