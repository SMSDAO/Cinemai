environment = "staging"
aws_region  = "us-east-1"

# VPC
vpc_cidr           = "10.1.0.0/16"
availability_zones = ["us-east-1a", "us-east-1b", "us-east-1c"]

# Database
db_instance_class    = "db.t3.medium"
db_allocated_storage = 50
db_name              = "cinemai_staging"
db_username          = "cinemai_staging"
# db_password set via environment variable: TF_VAR_db_password

# Redis
redis_node_type       = "cache.t3.small"
redis_num_cache_nodes = 1

# S3
s3_bucket_name = "cinemai-staging-assets"

# EKS
cluster_name        = "cinemai-staging-cluster"
cluster_version     = "1.28"
node_instance_types = ["t3.large"]
node_desired_size   = 3
node_min_size       = 2
node_max_size       = 6

# Tags
tags = {
  Project     = "CinemAi Neo"
  Environment = "staging"
  ManagedBy   = "Terraform"
}
