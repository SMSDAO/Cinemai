#!/bin/bash
# Bootstrap script - Set up development environment

echo "🚀 Bootstrapping CinemAi Neo..."

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend && npm install && cd ..

# Install mobile dependencies
echo "📱 Installing mobile dependencies..."
cd mobile && npm install && cd ..

# Install agent dependencies
echo "🤖 Installing agent dependencies..."
cd agents && npm install && cd ..

# Install worker dependencies
echo "⚙️ Installing worker dependencies..."
cd workers && npm install && cd ..

echo "✅ Bootstrap complete!"
