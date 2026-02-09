#!/bin/bash

# GitHub Pages Deployment Script for Kevin Parruque's Portfolio
# This script helps you deploy your portfolio to GitHub Pages

echo "========================================="
echo "Portfolio Deployment to GitHub Pages"
echo "========================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "⚠️  Git repository not initialized."
    echo "Initializing git repository..."
    git init
    echo "✅ Git initialized"
fi

# Check if remote exists
if ! git remote | grep -q "origin"; then
    echo ""
    echo "📝 Please enter your GitHub repository URL:"
    echo "Example: https://github.com/ParruqueK/portfolio.git"
    read -p "Repository URL: " REPO_URL
    
    git remote add origin "$REPO_URL"
    echo "✅ Remote repository added"
fi

echo ""
echo "📦 Building production version..."
yarn build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check for errors."
    exit 1
fi

echo "✅ Build successful"
echo ""

# Check if we need to commit changes
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Committing changes..."
    git add .
    git commit -m "Update portfolio - $(date '+%Y-%m-%d %H:%M:%S')"
    echo "✅ Changes committed"
else
    echo "ℹ️  No changes to commit"
fi

echo ""
echo "🚀 Deploying to GitHub Pages..."
yarn deploy

if [ $? -eq 0 ]; then
    echo ""
    echo "========================================="
    echo "✅ Deployment Successful!"
    echo "========================================="
    echo ""
    echo "Your portfolio will be available at:"
    echo "https://ParruqueK.github.io/portfolio"
    echo ""
    echo "⏳ It may take 5-10 minutes to go live."
    echo ""
    echo "To check deployment status:"
    echo "1. Go to https://github.com/ParruqueK/portfolio"
    echo "2. Click on 'Actions' tab"
    echo "3. Check the latest deployment"
    echo ""
else
    echo ""
    echo "❌ Deployment failed."
    echo "Please check the error messages above."
    echo ""
    echo "Common issues:"
    echo "- GitHub repository not created"
    echo "- GitHub Pages not enabled in repository settings"
    echo "- Git credentials not configured"
    echo ""
fi
