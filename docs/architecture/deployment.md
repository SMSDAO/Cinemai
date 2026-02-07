# Deployment Guide - CinemAi Neo

Complete guide for deploying CinemAi Neo to various environments.

## 🎯 Deployment Environments

### Development
- **Purpose**: Local development
- **Infrastructure**: Docker Compose
- **Database**: PostgreSQL (local)
- **Cache**: Redis (local)

### Staging
- **Purpose**: Pre-production testing
- **Infrastructure**: Kubernetes on AWS EKS
- **Database**: AWS RDS PostgreSQL
- **Cache**: AWS ElastiCache Redis
- **URL**: https://staging-api.cinemai.io

### Production
- **Purpose**: Live system
- **Infrastructure**: Kubernetes on AWS EKS
- **Database**: AWS RDS PostgreSQL (Multi-AZ)
- **Cache**: AWS ElastiCache Redis (Cluster)
- **URL**: https://api.cinemai.io

---

## 🐳 Docker Deployment

### Local Development

1. **Start all services:**
```bash
cd infra/docker
docker-compose up -d
```

2. **Run migrations:**
```bash
docker-compose exec backend npm run migrate
```

3. **Seed data:**
```bash
docker-compose exec backend npm run seed
```

4. **View logs:**
```bash
docker-compose logs -f backend
```

### Build Images

```bash
# Backend
docker build -t cinemai-backend:latest -f infra/docker/Dockerfile.backend .

# Workers
docker build -t cinemai-workers:latest -f infra/docker/Dockerfile.workers .

# Agents
docker build -t cinemai-agents:latest -f infra/docker/Dockerfile.agents .
```

---

## ☸️ Kubernetes Deployment

### Prerequisites

1. **Install kubectl:**
```bash
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
```

2. **Configure AWS CLI:**
```bash
aws configure
```

3. **Update kubeconfig:**
```bash
aws eks update-kubeconfig --name cinemai-production --region us-east-1
```

### Deploy to Kubernetes

1. **Create namespace:**
```bash
kubectl apply -f infra/k8s/namespace.yaml
```

2. **Create secrets:**
```bash
kubectl apply -f infra/k8s/secrets/app-secrets.yaml
```

3. **Deploy database:**
```bash
kubectl apply -f infra/k8s/deployments/postgres-deployment.yaml
kubectl apply -f infra/k8s/services/postgres-service.yaml
kubectl apply -f infra/k8s/persistent-volumes/postgres-pv.yaml
```

4. **Deploy Redis:**
```bash
kubectl apply -f infra/k8s/deployments/redis-deployment.yaml
kubectl apply -f infra/k8s/services/redis-service.yaml
kubectl apply -f infra/k8s/persistent-volumes/redis-pv.yaml
```

5. **Deploy backend:**
```bash
kubectl apply -f infra/k8s/deployments/backend-deployment.yaml
kubectl apply -f infra/k8s/services/backend-service.yaml
```

6. **Deploy workers:**
```bash
kubectl apply -f infra/k8s/deployments/workers-deployment.yaml
```

7. **Deploy agents:**
```bash
kubectl apply -f infra/k8s/deployments/agents-deployment.yaml
```

8. **Deploy ingress:**
```bash
kubectl apply -f infra/k8s/ingress/ingress.yaml
```

### Verify Deployment

```bash
# Check pods
kubectl get pods -n cinemai-production

# Check services
kubectl get svc -n cinemai-production

# Check ingress
kubectl get ingress -n cinemai-production

# View logs
kubectl logs -f deployment/backend -n cinemai-production
```

---

## 🏗️ Terraform Deployment

### Initialize Terraform

```bash
cd infra/terraform
terraform init
```

### Plan Infrastructure

```bash
# Development
terraform plan -var-file=environments/dev/terraform.tfvars

# Staging
terraform plan -var-file=environments/staging/terraform.tfvars

# Production
terraform plan -var-file=environments/production/terraform.tfvars
```

### Apply Infrastructure

```bash
# Production
terraform apply -var-file=environments/production/terraform.tfvars
```

### Destroy Infrastructure

```bash
terraform destroy -var-file=environments/production/terraform.tfvars
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

1. **Backend CI** (`.github/workflows/backend-ci.yml`)
   - Runs on push to `main` or `develop`
   - Lints, tests, and builds backend

2. **Mobile CI** (`.github/workflows/mobile-ci.yml`)
   - Runs on push to `main` or `develop`
   - Builds iOS and Android apps

3. **Deploy to Staging** (`.github/workflows/deploy-staging.yml`)
   - Runs on push to `develop`
   - Deploys to staging environment

4. **Deploy to Production** (`.github/workflows/deploy-production.yml`)
   - Runs on push to `main` or version tags
   - Deploys to production environment

### Deployment Process

1. **Create feature branch:**
```bash
git checkout -b feature/new-feature
```

2. **Commit changes:**
```bash
git add .
git commit -m "feat: add new feature"
git push origin feature/new-feature
```

3. **Create pull request** to `develop` branch

4. **After approval**, merge to `develop`
   - Automatically deploys to **staging**

5. **After testing**, create PR from `develop` to `main`

6. **Merge to `main`**
   - Automatically deploys to **production**

---

## 📊 Monitoring

### Health Checks

```bash
# Backend health
curl https://api.cinemai.io/health

# Database health
kubectl exec -it deployment/postgres -n cinemai-production -- pg_isready

# Redis health
kubectl exec -it deployment/redis -n cinemai-production -- redis-cli ping
```

### Logs

```bash
# Backend logs
kubectl logs -f deployment/backend -n cinemai-production

# Worker logs
kubectl logs -f deployment/workers -n cinemai-production

# Agent logs
kubectl logs -f deployment/agents -n cinemai-production
```

### Metrics

Access metrics at:
- Prometheus: https://prometheus.cinemai.io
- Grafana: https://grafana.cinemai.io
- Datadog: https://app.datadoghq.com

---

## 🔒 Security

### SSL Certificates

Certificates are managed by AWS Certificate Manager (ACM) and automatically renewed.

### Secrets Management

Secrets are stored in:
- Kubernetes Secrets
- AWS Secrets Manager
- Environment variables

Never commit secrets to Git!

### Firewall Rules

- Backend API: Open to public (port 443)
- Database: Internal only
- Redis: Internal only
- Workers: Internal only
- Agents: Internal only

---

## 🚨 Rollback

### Rollback Kubernetes Deployment

```bash
# View revision history
kubectl rollout history deployment/backend -n cinemai-production

# Rollback to previous version
kubectl rollout undo deployment/backend -n cinemai-production

# Rollback to specific revision
kubectl rollout undo deployment/backend --to-revision=2 -n cinemai-production
```

### Rollback Database Migration

```bash
# Connect to backend pod
kubectl exec -it deployment/backend -n cinemai-production -- /bin/bash

# Run rollback
npm run migrate:rollback
```

---

## 📈 Scaling

### Horizontal Pod Autoscaling

```bash
# Scale backend manually
kubectl scale deployment backend --replicas=5 -n cinemai-production

# Enable autoscaling
kubectl autoscale deployment backend --min=2 --max=10 --cpu-percent=70 -n cinemai-production
```

### Database Scaling

For database scaling, contact AWS support or use RDS console to:
- Increase instance size (vertical scaling)
- Add read replicas (horizontal scaling)

---

## 🆘 Troubleshooting

### Pod Crashes

```bash
# Check pod status
kubectl get pods -n cinemai-production

# View pod events
kubectl describe pod <pod-name> -n cinemai-production

# View logs
kubectl logs <pod-name> -n cinemai-production
```

### Database Connection Issues

```bash
# Test connection from pod
kubectl exec -it deployment/backend -n cinemai-production -- \
  psql -h postgres-service -U postgres -d cinemai
```

### Redis Connection Issues

```bash
# Test connection from pod
kubectl exec -it deployment/backend -n cinemai-production -- \
  redis-cli -h redis-service ping
```

---

## 📝 Deployment Checklist

Before deploying to production:

- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Database migrations tested
- [ ] Environment variables configured
- [ ] Secrets updated
- [ ] Load testing completed
- [ ] Security scan passed
- [ ] Monitoring dashboards configured
- [ ] Rollback plan documented
- [ ] Team notified

---

**Version**: 1.0.0  
**Last Updated**: 2026-02-07
