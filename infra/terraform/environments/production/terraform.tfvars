environment = "production"
aws_region  = "us-east-1"

# VPC
vpc_cidr           = "10.2.0.0/16"
availability_zones = ["us-east-1a", "us-east-1b", "us-east-1c"]

# Database
db_instance_class    = "db.r6g.xlarge"
db_allocated_storage = 200
db_name              = "cinemai"
db_username          = "cinemai"
# db_password set via environment variable: TF_VAR_db_password

# Redis
redis_node_type       = "cache.r6g.large"
redis_num_cache_nodes = 2

# S3
s3_bucket_name = "cinemai-production-assets"

# EKS
cluster_name        = "cinemai-production-cluster"
cluster_version     = "1.28"
node_instance_types = ["t3.xlarge", "t3.2xlarge"]
node_desired_size   = 5
node_min_size       = 3
node_max_size       = 20

# Tags
tags = {
  Project     = "CinemAi Neo"
  Environment = "production"
  ManagedBy   = "Terraform"
  CostCenter  = "Engineering"
}
