terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.23"
    }
  }

  backend "s3" {
    bucket         = "cinemai-terraform-state"
    key            = "infrastructure/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    dynamodb_table = "cinemai-terraform-locks"
  }
}

# Main Infrastructure
module "networking" {
  source = "./modules/networking"

  environment         = var.environment
  vpc_cidr           = var.vpc_cidr
  availability_zones = var.availability_zones
  tags               = var.tags
}

module "database" {
  source = "./modules/database"

  environment         = var.environment
  vpc_id             = module.networking.vpc_id
  private_subnet_ids = module.networking.private_subnet_ids
  db_instance_class  = var.db_instance_class
  db_allocated_storage = var.db_allocated_storage
  db_name            = var.db_name
  db_username        = var.db_username
  db_password        = var.db_password
  tags               = var.tags
}

module "cache" {
  source = "./modules/cache"

  environment         = var.environment
  vpc_id             = module.networking.vpc_id
  private_subnet_ids = module.networking.private_subnet_ids
  redis_node_type    = var.redis_node_type
  redis_num_cache_nodes = var.redis_num_cache_nodes
  tags               = var.tags
}

module "storage" {
  source = "./modules/storage"

  environment = var.environment
  bucket_name = var.s3_bucket_name
  tags        = var.tags
}

module "compute" {
  source = "./modules/compute"

  environment         = var.environment
  vpc_id             = module.networking.vpc_id
  private_subnet_ids = module.networking.private_subnet_ids
  public_subnet_ids  = module.networking.public_subnet_ids
  cluster_name       = var.cluster_name
  cluster_version    = var.cluster_version
  node_instance_types = var.node_instance_types
  node_desired_size  = var.node_desired_size
  node_min_size      = var.node_min_size
  node_max_size      = var.node_max_size
  tags               = var.tags
}
