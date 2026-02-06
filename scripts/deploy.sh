#!/bin/bash
# Deployment script

echo "🚀 Deploying CinemAi Neo..."

# Build all services
echo "📦 Building services..."
cd backend && npm run build && cd ..

# Deploy infrastructure
echo "☁️ Deploying infrastructure..."
cd infra/terraform
terraform apply -auto-approve
cd ../..

echo "✅ Deployment complete!"
