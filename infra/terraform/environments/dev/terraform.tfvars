environment = "dev"
aws_region  = "us-east-1"

# VPC
vpc_cidr           = "10.0.0.0/16"
availability_zones = ["us-east-1a", "us-east-1b"]

# Database
db_instance_class    = "db.t3.small"
db_allocated_storage = 20
db_name              = "cinemai_dev"
db_username          = "cinemai_dev"
# db_password set via environment variable: TF_VAR_db_password

# Redis
redis_node_type       = "cache.t3.micro"
redis_num_cache_nodes = 1

# S3
s3_bucket_name = "cinemai-dev-assets"

# EKS
cluster_name        = "cinemai-dev-cluster"
cluster_version     = "1.28"
node_instance_types = ["t3.medium"]
node_desired_size   = 2
node_min_size       = 1
node_max_size       = 4

# Tags
tags = {
  Project     = "CinemAi Neo"
  Environment = "dev"
  ManagedBy   = "Terraform"
}
