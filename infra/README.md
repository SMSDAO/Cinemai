# Infrastructure - CinemAi Neo

Infrastructure as Code (IaC) and deployment configurations.

## 🏗️ Structure

- **`docker/`** - Docker configurations and Dockerfiles
- **`k8s/`** - Kubernetes manifests and Helm charts
- **`terraform/`** - Terraform modules for cloud infrastructure
- **`ci-cd/`** - CI/CD pipeline configurations (GitHub Actions, etc.)

## 🚀 Deployment

### Docker
```bash
# Build all services
docker-compose build

# Start services
docker-compose up
```

### Kubernetes
```bash
# Apply manifests
kubectl apply -f k8s/

# Install with Helm
helm install cinemai ./k8s/charts/cinemai
```

### Terraform
```bash
# Initialize
terraform init

# Plan changes
terraform plan

# Apply infrastructure
terraform apply
```

## 📦 Environments

- Development
- Staging
- Production
